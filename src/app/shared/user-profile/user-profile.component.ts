import { AlertService } from '../alert/services/alert.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, signal } from '@angular/core';
import { IAuthDataStore } from '@interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectAuthData } from 'src/app/store/auth-data/auth-data.selectors';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-user-profile',
	standalone: true,
	imports: [AsyncPipe],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
	isLoading = signal<boolean>(false);
	authData$!: Observable<IAuthDataStore>;

	constructor(
		private alertService: AlertService,
		private authService: AuthService,
		private router: Router,
		private store: Store<{ authData: IAuthDataStore }>
	) {
		this.authData$ = this.store.select(selectAuthData);
	}

	logout(): void {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['login']);
			},
			error: () => {
				this.alertService.send('error', 'Erro ao sair');
				this.isLoading.set(false);
			},
			complete: () => {
				this.isLoading.set(false);
			}
		});
	}
}
