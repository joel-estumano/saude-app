import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './layout.component.html'
})
export class LayoutComponent {
	isLoading = signal<boolean>(false);
	constructor(
		private authService: AuthService,
		private alertService: AlertService,
		private router: Router
	) {}

	logout(): void {
		this.authService.logout().subscribe({
			next: () => {
				this.router.navigate(['/login']);
			},
			error: () => {
				this.alertService.add('error', 'Erro ao sair'); // Adiciona mensagem de erro ao serviço de alertas
				this.isLoading.set(false);
			},
			complete: () => {
				this.isLoading.set(false);
			}
		});
	}
}
