import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
	/**
	 * @description
	 * Adiciona a classe 'invalid' ao controle se ele estiver sujo (dirty) ou tocado (touched) e inválido.
	 *
	 * @param control - O controle do formulário a ser validado.
	 * @param submitted - Um parâmetro booleano opcional para indicar se o formulário foi submetido.
	 * @returns Um objeto com a classe 'invalid' definida se a condição for satisfeita.
	 */
	public static invalidClass(control: AbstractControl, submitted = true): Record<string, boolean> {
		return {
			'is-invalid': (control.dirty || control.touched) && control.invalid && submitted
		};
	}

	/**
	 * @description
	 * Marca todos os controles dentro de um FormGroup como sujos (dirty) e verifica a validade do formulário.
	 *
	 * @param form - O FormGroup a ser validado.
	 * @returns Um booleano indicando se o formulário é válido.
	 */
	public static valid(form: FormGroup): boolean {
		Object.keys(form.controls).forEach((controlName) => {
			const control = form.get(controlName);
			if (control) {
				if (control instanceof FormGroup) {
					this.valid(control);
				} else if (control instanceof FormArray) {
					control.controls.forEach((controlGroup) => {
						this.valid(controlGroup as FormGroup);
					});
				}
				control.markAsDirty();
			}
		});
		return form.valid;
	}

	/**
	 * @description
	 * Validador que exige que o controle tenha um valor não vazio.
	 *
	 * @usageNotes
	 *
	 * ### Validar que o campo não está vazio
	 *
	 * ```ts
	 * const control = new FormControl('', CustomValidators.notEmpty);
	 *
	 * console.log(control.errors); // { empty: true }
	 * ```
	 *
	 * @returns Um mapa de erros com a propriedade `empty`
	 * se a validação falhar, caso contrário `null`.
	 *
	 * @see {@link updateValueAndValidity()}
	 *
	 */
	// static notEmpty(control: AbstractControl): ValidationErrors | null {
	// 	const value = control.value;

	// 	if (typeof value !== 'string' || !value.trim()) {
	// 		return { empty: true };
	// 	}

	// 	return null;
	// }
	static notEmpty(control: AbstractControl): ValidationErrors | null {
		const value = control.value;

		// Verifica se o valor é uma string e se não está vazio
		if (typeof value !== 'string' || !value.trim()) {
			return { empty: true };
		}

		// Regex para capturar qualquer tag HTML e verificar o conteúdo dentro dela
		const regex = /<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>(.*?)<\/\1>/;
		const match = value.match(regex);

		// Se encontrar uma tag válida, verifica se o conteúdo interno está vazio
		if (match && match[2].trim() === '') {
			return { empty: true }; // Conteúdo vazio
		}

		return null; // Tudo está válido
	}

	/**
	 * @description
	 * Validador que verifica se um controle do tipo `<select>` não tem a opção padrão selecionada.
	 *
	 * @usageNotes
	 *
	 * ### Validar que o campo de seleção tem uma opção válida
	 *
	 * ```ts
	 * const control = new FormControl('', CustomValidators.noSelect('defaultOption'));
	 *
	 * console.log(control.errors); // { noSelection: true } se a opção padrão foi selecionada
	 * ```
	 *
	 * @param invalidOption Valor inválido que representa a opção não selecionada (ex.: 'defaultOption').
	 * @returns Um mapa de erros com a propriedade `noSelection`
	 * se a validação falhar, caso contrário `null`.
	 */

	static noSelect(invalidOption: string | null = '') {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;

			// Verifica se o valor é igual à opção inválida
			if (value === invalidOption || value === null || value === undefined) {
				return { noSelection: true };
			}

			return null; // Tudo está válido
		};
	}

	/**
	 * Validador estático para verificar o comprimento mínimo de um array.
	 *
	 * @param minLength O comprimento mínimo exigido para o array.
	 * @returns Uma função de validação que retorna um erro caso o comprimento seja menor que `minLength`.
	 */
	static arrayMinLength(minLength: number) {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;
			const valid = Array.isArray(value) && value.length >= minLength;

			// Verifica se o valor é um array e se atende ao comprimento mínimo
			if (valid) {
				return null; // Validação bem-sucedida
			}

			// Retorna o erro com os detalhes do comprimento esperado e atual
			return { arrayMinLength: true };
		};
	}

	/**
	 * Obtém um controle do formulário.
	 *
	 * @param form O grupo de formulários do qual obter o controle.
	 * @param name O nome do controle a ser obtido.
	 * @returns O controle do formulário correspondente ao nome fornecido.
	 *
	 * @usageNotes
	 *
	 * ### Exemplo de uso
	 *
	 * ```ts
	 * const control = FormUtils.getControl(myForm, 'email');
	 * console.log(control.value); // valor do controle 'email'
	 * ```
	 */
	static getControl(form: FormGroup, name: string): AbstractControl {
		return form.controls[name];
	}

	/**
	 * Formata uma string de data no formato "ddMMyyyy" para "yyyy-MM-dd".
	 *
	 * @param dateString A data no formato "ddMMyyyy".
	 * @returns Uma string formatada no formato "yyyy-MM-dd".
	 * @throws Erro se a string não for válida.
	 */
	static formatDateIn(dateString: string): string {
		if (!dateString || dateString.length !== 8) {
			throw new Error('A data deve estar no formato ddMMyyyy com exatamente 8 caracteres.');
		}

		const day = dateString.substring(0, 2);
		const month = dateString.substring(2, 4);
		const year = dateString.substring(4, 8);

		// Validação básica para garantir valores numéricos
		if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
			throw new Error('A data contém valores inválidos. Certifique-se de que está no formato ddMMyyyy.');
		}

		// Retorna a data no formato ISO "yyyy-MM-dd"
		return `${year}-${month}-${day}`;
	}

	/**
	 * Converte uma string de data no formato "yyyy-MM-dd" para "ddMMyyyy".
	 *
	 * @param dateString A data no formato "yyyy-MM-dd".
	 * @returns Uma string formatada no formato "ddMMyyyy".
	 * @throws Erro se a string não for válida.
	 */
	static formatDateOut(dateString: string): string {
		if (!dateString || dateString.length !== 10) {
			throw new Error('A data deve estar no formato yyyy-MM-dd com exatamente 10 caracteres.');
		}

		const year = dateString.substring(0, 4);
		const month = dateString.substring(5, 7);
		const day = dateString.substring(8, 10);

		// Validação básica para garantir valores numéricos
		if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
			throw new Error('A data contém valores inválidos. Certifique-se de que está no formato yyyy-MM-dd.');
		}

		// Retorna a data no formato "ddMMyyyy"
		return `${day}${month}${year}`;
	}

	static listFormErrors(form: FormGroup): { field: string; errors: string[] }[] {
		const errorArray: { field: string; errors: string[] }[] = [];
		Object.keys(form.controls).forEach((key) => {
			const control = form.get(key);
			if (control && control.errors) {
				const fieldErrors: string[] = Object.keys(control.errors).map((errorKey) => {
					switch (errorKey) {
						case 'required':
							return 'é obrigatório';
						case 'email':
							return 'é inválido';
						case 'empty':
							return 'está vazio';
						case 'noSelection':
							return 'não foi selecionado';
						case 'arrayMinLength':
							return 'precisa selecionar items';
						default:
							return 'é inválido';
					}
				});
				errorArray.push({ field: key, errors: fieldErrors });
			}
		});

		return errorArray;
	}
}
