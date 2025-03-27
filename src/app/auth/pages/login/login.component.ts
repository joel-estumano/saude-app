import { NgClass } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FormUtils } from 'src/app/utils';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILogin } from '@types';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
	protected loginForm: FormGroup; // Formulário principal para login
	protected isFormSubmited = signal<boolean>(false); // Sinal para rastrear estado de submissão do formulário
	protected isLoading = signal<boolean>(false); // Sinal para rastrear o estado de carregamento
	protected formUtils = FormUtils; // Utilitário para validação de formulários

	constructor(
		private fb: FormBuilder, // Serviço para construir formulários reativos
		private authService: AuthService, // Serviço de autenticação
		private alertService: AlertService, // Serviço para exibir mensagens de alerta
		private router: Router // Serviço para navegação entre rotas
	) {
		// Inicializa o formulário de login com os campos 'email' e 'password'
		this.loginForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]), // Campo de email, obrigatório e com validação de formato
			password: new FormControl('', [Validators.required]) // Campo de senha, apenas obrigatório
		});
	}

	/**
	 * Método para efetuar login ao submeter o formulário.
	 * Inclui validações e chamadas ao serviço de autenticação.
	 */
	login(): void {
		this.isFormSubmited.set(true); // Define o estado de submissão como verdadeiro

		// Verifica se o formulário é válido
		if (this.formUtils.valid(this.loginForm)) {
			this.loginForm.disable(); // Desabilita todos os campos enquanto o login está em andamento
			this.isLoading.set(true); // Inicia o estado de carregamento

			// Cria o payload de login com dados necessários
			const payload: ILogin = {
				client_id: environment.clientId,
				client_secret: environment.clientSecret,
				grant_type: 'password',
				username: this.loginForm.controls['email'].value,
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
			this.alertService.add('error', `${element.field} ${element.errors.toString()}`);
		});
	}

	/**
	 * Converte erros de autenticação em mensagens legíveis para o usuário.
	 * @param error Código de erro retornado pela API
	 * @returns Mensagem traduzida
	 */
	private loginErrorFeedback(error: string): string {
		switch (error) {
			case 'invalid_credentials':
				return 'credenciais inválidas!';
			default:
				return 'não autorizado!';
		}
	}

	/**
	 * Ciclo de vida do Angular - OnDestroy.
	 * Pode ser usado para limpar assinaturas ou recursos ao destruir o componente.
	 */
	ngOnDestroy(): void {
		console.log('Componente Login destruído.');
	}
}
