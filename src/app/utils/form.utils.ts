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
			return { emptyTagContent: true }; // Conteúdo vazio
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
