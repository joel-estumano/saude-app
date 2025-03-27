import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ContainerBaseComponent, FormsModule, ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	protected registerForm: FormGroup;
	constructor(private fb: FormBuilder) {
		this.registerForm = this.fb.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}
	register(): void {
		console.log('...');
	}
}
