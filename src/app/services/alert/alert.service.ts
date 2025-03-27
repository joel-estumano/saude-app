import { Injectable } from '@angular/core';
import { IAlert } from '@types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AlertService {
	private alerts: IAlert[] = [];
	private alertsSubject = new BehaviorSubject<IAlert[]>(this.alerts);

	getAlerts(): Observable<IAlert[]> {
		return this.alertsSubject.asObservable();
	}

	add(type: IAlert['type'], message: string): void {
		this.alerts.push({ message, type });
		this.alertsSubject.next(this.alerts);
	}

	remove(index: number): void {
		this.alerts.splice(index, 1);
		this.alertsSubject.next(this.alerts);
	}

	clearAll(): void {
		this.alerts = [];
		this.alertsSubject.next(this.alerts);
	}
}
