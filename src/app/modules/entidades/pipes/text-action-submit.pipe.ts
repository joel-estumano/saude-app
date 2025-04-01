import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'textActionSubmit'
})
export class TextActionSubmitPipe implements PipeTransform {
	/**
	 * Transforma o estado de carregamento e edição em texto apropriado.
	 *
	 * @param isLoading - Indica se está carregando (boolean).
	 * @param isEdit - Indica se está em modo de edição (boolean).
	 * @returns Retorna o texto apropriado: "Salvando", "Salvar", "Editando", ou "Editar".
	 */
	transform(isLoading: boolean, isEdit: boolean): string {
		if (isLoading && isEdit) {
			return 'Editando';
		}
		if (isLoading) {
			return 'Salvando';
		}
		return isEdit ? 'Editar' : 'Salvar';
	}
}
