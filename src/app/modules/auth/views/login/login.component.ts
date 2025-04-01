import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils';
import { ILoginPayload } from '@interfaces';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	protected loginForm: FormGroup;
	protected isFormSubmited = signal<boolean>(false);
	protected isLoading = signal<boolean>(false);
	protected formUtils = FormUtils;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertService: AlertService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}

	/**
	 * Método para efetuar login ao submeter o formulário.
	 * Inclui validações e chamadas ao serviço de autenticação.
	 */
	login(): void {
		this.isFormSubmited.set(true);

		// Verifica se o formulário é válido
		if (this.formUtils.valid(this.loginForm)) {
			this.loginForm.disable(); // Desabilita todos os campos enquanto o login está em andamento
			this.isLoading.set(true); // Inicia o estado de carregamento

			// Cria o payload de login com dados necessários
			const payload: ILoginPayload = {
				client_id: environment.clientId,
				client_secret: environment.clientSecret,
				grant_type: 'password',
				username: this.loginForm.controls['email'].value.trim(),
				password: this.loginForm.controls['password'].value,
				scope: ''
			};

			this.authService.login(payload).subscribe({
				next: () => {
					this.router.navigate(['/']); // Redireciona para a rota principal em caso de sucesso
				},
				error: (err) => {
					this.alertService.add('error', this.loginErrorFeedback(err.error)); // Adiciona mensagem de erro ao serviço de alertas
					this.loginForm.enable(); // Reabilita o formulário para edição
					this.isLoading.set(false);
					this.isFormSubmited.set(false);
				},
				complete: () => {
					this.loginForm.enable(); // Reabilita o formulário
					this.isLoading.set(false);
					this.isFormSubmited.set(false);
				}
			});
		} else {
			this.invalidFormFeedback(); // Exibe mensagem de erro caso o formulário seja inválido
		}
	}

	/**
	 * Feedback para informar ao usuário sobre campos inválidos no formulário.
	 * Traduz e exibe mensagens de erro personalizadas.
	 */
	private invalidFormFeedback(): void {
		const erros = this.formUtils.listFormErrors(this.loginForm).map((error) => {
			return {
				...error,
				field: (() => {
					switch (error.field) {
						case 'password':
							return 'senha'; // Traduz "password" para "senha"
						default:
							return error.field;
					}
				})()
			};
		});
		// Itera sobre os erros encontrados e exibe mensagens de alerta
		erros.forEach((element) => {
			this.alertService.add('error', `${element.field} ${element.errors.join(', ')}.`);
		});
	}

	private loginErrorFeedback(error: string): string {
		switch (error) {
			case 'invalid_credentials':
				return 'credenciais inválidas!';
			default:
				return 'não autorizado!';
		}
	}
}
