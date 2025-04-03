import { Component, signal, computed } from '@angular/core';
import { EntidadeValidErrorResponse } from '@interfaces';

@Component({
	selector: 'app-modal-erros',
	templateUrl: './modal-erros.component.html',
	styleUrls: ['./modal-erros.component.scss']
})
export class ModalErrosComponent {
	// Signal que armazena o objeto de erros (inicialmente indefinido)
	private rawErrors = signal<Record<string, string[]> | undefined>(undefined);

	protected status = signal<number | undefined>(undefined);

	// Computed que processa rawErrors para gerar uma lista de strings
	erros = computed(() => {
		const errors = this.rawErrors();
		return errors ? Object.values(errors).flat() : []; // Retorna lista de strings ou um array vazio
	});

	/**
	 * Método para atualizar os erros recebidos
	 * @param errors Objeto de erros no formato { campo: [mensagens] }
	 */
	setErrors(error: EntidadeValidErrorResponse): void {
		const message = error.error.message;
		this.rawErrors.set(message); // Atualiza o rawErrors
		this.status.set(error.status);
	}

	/**
	 * Método para limpar os erros e fechar o modal
	 */
	close(): void {
		this.rawErrors.set(undefined); // Reseta o rawErrors
	}
}
