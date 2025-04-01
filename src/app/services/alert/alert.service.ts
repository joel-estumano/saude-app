import { Injectable } from '@angular/core';
import { IAlert } from '@interfaces';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	private alerts: IAlert[] = [];
	private alertsSubject = new BehaviorSubject<IAlert[]>(this.alerts);

	/**
	 * Obtém a lista de alertas como um Observable.
	 *
	 * Use este método para observar alterações na lista de alertas, permitindo que
	 * componentes atualizem automaticamente sua exibição quando novos alertas forem adicionados
	 * ou removidos.
	 *
	 * @returns Observable contendo a lista atualizada de alertas.
	 */
	getAlerts(): Observable<IAlert[]> {
		return this.alertsSubject.asObservable();
	}

	/**
	 * Adiciona um novo alerta e programa sua remoção automática após o tempo especificado.
	 *
	 * Este método cria um alerta com a mensagem e o tipo especificados, adiciona-o à lista
	 * de alertas e o remove automaticamente após o atraso definido (em milissegundos).
	 *
	 * @param type - Tipo do alerta (ex.: 'success', 'error', etc.).
	 * @param message - Mensagem descritiva do alerta.
	 * @param timedelay - Tempo (em milissegundos) antes de o alerta ser automaticamente removido. O padrão é 3000 ms.
	 * @returns Observable que emite após o tempo de atraso e antes de o alerta ser removido.
	 */
	add(type: IAlert['type'], message: string, timedelay = 3000): Observable<void> {
		const alert: IAlert = { message, type };
		this.alerts.push(alert);
		this.alertsSubject.next(this.alerts);

		return of(undefined).pipe(
			delay(timedelay),
			tap(() => {
				this.remove(this.alerts.indexOf(alert));
			})
		);
	}

	/**
	 * Remove um alerta específico da lista pelo índice.
	 *
	 * Use este método para excluir um alerta diretamente com base na posição
	 * dele na lista de alertas.
	 *
	 * @param index - Índice do alerta na lista. Caso o índice seja inválido, nenhuma ação será executada.
	 */
	remove(index: number): void {
		if (index > -1) {
			this.alerts.splice(index, 1);
			this.alertsSubject.next(this.alerts);
		}
	}

	/**
	 * Remove todos os alertas da lista.
	 *
	 * Este método limpa completamente a lista de alertas, garantindo que nenhum
	 * alerta permaneça ativo.
	 */
	clearAll(): void {
		this.alerts = [];
		this.alertsSubject.next(this.alerts);
	}
}
