import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProgressBarService {
	// Gerencia o número de requisições ativas
	private requestCount = 0;

	// Exposição do estado da barra de progresso
	private progressSubject = new BehaviorSubject<boolean>(false);
	public readonly progress$ = this.progressSubject.asObservable();

	showProgress(): void {
		this.requestCount++;
		console.log('showProgress chamado, requisições ativas:', this.requestCount);
		this.updateProgressState();
	}

	hideProgress(): void {
		if (this.requestCount > 0) {
			this.requestCount--;
		}
		console.log('hideProgress chamado, requisições ativas:', this.requestCount);
		this.updateProgressState();
	}

	// Atualiza o estado baseado no número de requisições
	private updateProgressState(): void {
		this.progressSubject.next(this.requestCount > 0);
	}
}
