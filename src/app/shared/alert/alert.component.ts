import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { IAlert } from '@interfaces';
import { AlertService } from 'src/app/services/alert/alert.service';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [NgClass, IconComponent],
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
