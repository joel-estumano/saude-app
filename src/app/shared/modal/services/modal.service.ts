import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private modalContentSubject = new BehaviorSubject<Type<unknown> | null>(null);
	private modalInstanceSubject = new BehaviorSubject<unknown | null>(null);

	modalContent$ = this.modalContentSubject.asObservable();

	/**
	 * Define o componente que será exibido no modal.
	 *
	 * @param component - O tipo do componente a ser exibido.
	 */
	open<T>(component: Type<T>): void {
		this.modalContentSubject.next(component); // Atualiza o componente para ser exibido
	}

	/**
	 * Fecha o modal e reseta o estado.
	 */
	close(): void {
		this.modalContentSubject.next(null); // Fecha o modal
		this.modalInstanceSubject.next(null); // Reseta a instância
	}

	/**
	 * Salva a instância do componente renderizado no modal.
	 *
	 * @param instance - A instância do componente a ser armazenada.
	 */
	setInstance<T>(instance: T): void {
		this.modalInstanceSubject.next(instance); // Salva a instância do componente
	}

	/**
	 * Obtém a instância do componente renderizado no modal.
	 *
	 * @returns A instância do componente atualmente no modal, ou null se nenhum estiver renderizado.
	 */
	getInstance<T>(): T | null {
		return this.modalInstanceSubject.getValue() as T | null; // Realiza o cast para o tipo apropriado
	}
}
