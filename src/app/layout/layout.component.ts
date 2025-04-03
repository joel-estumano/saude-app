import { AlertService } from '../shared/alert/services/alert.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, ProgressBarModule],
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
				this.alertService.send('error', 'Erro ao sair'); // Adiciona mensagem de erro ao serviço de alertas
				this.isLoading.set(false);
			},
			complete: () => {
				this.isLoading.set(false);
			}
		});
	}
}
