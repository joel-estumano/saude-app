import { Component } from '@angular/core';
import { IAlert } from '@interfaces';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
	selector: 'app-base',
	standalone: true,
	imports: [],
	templateUrl: './base.component.html',
	styleUrl: './base.component.scss'
})
export abstract class BaseComponent {
	constructor(protected alertService: AlertService) {}

	/**
	 * Adiciona um alerta com base na mensagem, tipo e tempo.
	 * @param type Tipo do alerta ('success', 'error', etc.)
	 * @param message Mensagem do alerta
	 * @param timedelay Tempo de exibição em milissegundos (padrão: 3000)
	 */
	addAlert(type: IAlert['type'], message: string, timedelay = 3000): void {
		this.alertService.send(type, message, timedelay);
	}

	/**
	 * Limpa todos os alertas.
	 */
	clearAlerts(): void {
		this.alertService.clearAll();
	}
}
