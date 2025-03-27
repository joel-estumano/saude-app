import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegional } from '@types';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { catchError, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';
import { AlertService } from 'src/app/services/alert/alert.service';
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
export class EntityAddComponent implements OnDestroy {
	protected entityForm: FormGroup;
	protected formUtils = FormUtils;
	protected isFormSubmited = false;
	protected regional$!: Observable<IRegional[]>;
	protected erro: Error | null = null;
	private reloadTrigger$ = new Subject<void>();

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private regionalService: RegionalService,
		private alertService: AlertService
	) {
		this.entityForm = this.fb.group({
			razao_social: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			nome_fantasia: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			cnpj: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			regional_id: new FormControl('', [Validators.required, FormUtils.noSelect('')]),
			data_inauguracao: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			ativa: new FormControl(false)
		});

		this.regional$ = this.reloadTrigger$.pipe(
			startWith(undefined),
			switchMap(() =>
				this.regionalService.list().pipe(
					catchError((err) => {
						this.erro = err; // Captura o erro
						this.alertService.add('error', 'Ocorreu um erro ao carregar dados.');
						return of([]); // Retorna fallback (lista vazia)
					})
				)
			)
		);
	}

	reloadData() {
		this.erro = null; // Reseta o estado de erro
		this.reloadTrigger$.next();
	}

	ngOnDestroy(): void {
		this.alertService.clearAll();
	}

	cancel(): void {
		this.router.navigate(['/']);
	}

	save(): void {
		this.isFormSubmited = true;
		if (this.formUtils.valid(this.entityForm)) {
			console.log('form: ', this.entityForm.getRawValue());
		} else {
			this.invalidFormFeedback(); // Exibe mensagem de erro caso o formulário seja inválido

			console.log(this.entityForm.getRawValue());
		}
	}

	/**
	 * Feedback para informar ao usuário sobre campos inválidos no formulário.
	 * Traduz e exibe mensagens de erro personalizadas.
	 */
	private invalidFormFeedback(): void {
		const erros = this.formUtils.listFormErrors(this.entityForm).map((error) => {
			return {
				...error,
				field: (() => {
					switch (error.field) {
						case 'cnpj':
							return 'CNPJ';
						case 'regional_id':
							return 'Regional';
						case 'razao_social':
							return 'Razao Social ';
						case 'nome_fantasia':
							return 'Nome Fantasia';
						case 'data_inauguracao':
							return 'Data de Inauguração';

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
}
