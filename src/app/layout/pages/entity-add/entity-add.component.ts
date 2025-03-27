import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegional } from '@types';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';
import { RegionalService } from 'src/app/services/regional/regional.service';
import { FormUtils } from 'src/app/utils';

@Component({
	selector: 'app-entity-add',
	standalone: true,
	imports: [ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass, NgxMaskDirective, AsyncPipe],
	providers: [provideNgxMask()],
	templateUrl: './entity-add.component.html',
	styleUrl: './entity-add.component.scss'
})
export class EntityAddComponent {
	protected entityForm: FormGroup;
	protected formUtils = FormUtils;

	protected isFormSubmited = false;

	protected regional$!: Observable<IRegional[]>;
	/*
	especialidades: string[]; */

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private regionalService: RegionalService
	) {
		this.entityForm = this.fb.group({
			razao_social: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			nome_fantasia: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			cnpj: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			regional_id: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			data_inauguracao: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			ativa: new FormControl('')
		});

		this.regional$ = this.regionalService.list();
	}

	cancel(): void {
		this.router.navigate(['/']);
	}

	save(): void {
		this.isFormSubmited = true;
		if (this.formUtils.valid(this.entityForm)) {
			console.log('form: ', this.entityForm.getRawValue());
		} else {
			console.error('Inválid form');
		}
	}
}
