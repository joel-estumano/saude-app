import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAlert } from '@interfaces';
import { AlertService } from '../services/alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
	alerts: IAlert[] = [];

	constructor(
		private alertService: AlertService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		// Atualiza alerts e força a detecção de mudanças
		this.alertService.getAlerts().subscribe((alerts) => {
			this.alerts = alerts;
			this.cdr.markForCheck(); // Força detecção de mudanças no componente
		});
	}

	remove(index: number): void {
		this.alertService.remove(index);
	}
}
