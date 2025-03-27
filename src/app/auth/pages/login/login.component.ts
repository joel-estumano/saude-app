import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';
import { FormUtils } from 'src/app/utils';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	protected loginForm: FormGroup;
	protected isFormSubmited = false;
	protected isLoading = false;
	protected erro: Error | null = null;
	protected formUtils = FormUtils;

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}

	login(): void {
		this.isFormSubmited = true;
		if (this.formUtils.valid(this.loginForm)) {
			this.isLoading = true;
			// const data = this.loginForm.getRawValue();
			/* this.authService.login(data).subscribe({
				next: () => {
					this.router.navigate(['/']);
				},
				error: (err) => {
					this.erro = err;
					console.error('Error: ', err);
					this.alertService.addAlert('erro', err.message);
					this.isLoading = false;
					this.isFormSubmited = false;
				},
				complete: () => {
					this.erro = null;
					this.isLoading = false;
					this.isFormSubmited = false;
				}
			}); */
		} else {
			console.error('Inválid form');
		}
	}
}
