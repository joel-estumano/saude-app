import { AlertService } from '../alert/services/alert.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, signal } from '@angular/core';
import { IUser } from '@interfaces';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectUser } from 'src/app/store/user/user.selectors';
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
	user$!: Observable<IUser | null>;

	constructor(
		private alertService: AlertService,
		private authService: AuthService,
		private router: Router,
		private store: Store<{ user: IUser }>
	) {
		this.user$ = this.store.select(selectUser);
	}

	logout(): void {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['/login']);
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
