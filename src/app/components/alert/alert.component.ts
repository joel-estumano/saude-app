import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { IAlert } from '@types';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [NgClass],
	templateUrl: './alert.component.html',
	styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
	alerts: IAlert[] = [];

	constructor(private alertService: AlertService) {}

	ngOnInit(): void {
		this.alertService.getAlerts().subscribe((alerts) => (this.alerts = alerts));
	}

	remove(index: number): void {
		this.alertService.remove(index);
	}
}
