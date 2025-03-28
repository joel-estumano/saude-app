import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEntityAddPayload, IEspecialidade, IRegional } from '@types';
import { catchError, combineLatest, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { RegionaisService } from 'src/app/services/regionais/regionais.service';
import { FormUtils } from 'src/app/utils';
import { EntityFormComponent } from '../../../components/entity-form/entity-form.component';
import { EspecialidadesService } from 'src/app/services/especialidades/especialidades.service';

@Component({
	selector: 'app-entity-add',
	standalone: true,
	imports: [ContainerBaseComponent, AsyncPipe, EntityFormComponent],
	templateUrl: './entity-add.component.html',
	styleUrl: './entity-add.component.scss'
})
export class EntityAddComponent implements OnDestroy {
	protected entityForm: FormGroup;
	protected isFormSubmited = signal<boolean>(false);
	protected isLoading = signal<boolean>(false);
	protected formUtils = FormUtils;

	protected regionais$!: Observable<IRegional[]>;
	protected especialidades$!: Observable<IEspecialidade[]>;
	protected dataCombined$ = combineLatest([
		this.regionais$ ?? of([]), // Garantir um fluxo válido se undefined
		this.especialidades$ ?? of([]) // Garantir um fluxo válido se undefined
	]).pipe(map(([regionais, especialidades]) => ({ regionais, especialidades })));

	private reloadTrigger$ = new Subject<void>();
	protected erro = signal<Error | null>(null);

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private regionalService: RegionaisService,
		private especialidadesService: EspecialidadesService,
		private alertService: AlertService,
		private entityService: EntityService
	) {
		this.entityForm = this.fb.group({
			razao_social: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			nome_fantasia: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			cnpj: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			regional_id: new FormControl('', [Validators.required, FormUtils.noSelect('')]),
			data_inauguracao: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			ativa: new FormControl(false),
			especialidades: new FormControl('', [Validators.required, FormUtils.arrayMinLength(5)])
		});

		this.dataCombined$ = this.reloadTrigger$.pipe(
			startWith(undefined), // Dispara o carregamento inicial
			switchMap(() =>
				combineLatest([
					this.regionalService.list().pipe(
						catchError((err) => {
							this.erro.set(err); // Captura o erro
							this.alertService.add('error', 'Erro ao carregar regionais.');
							return of([]); // Retorna fallback vazio
						})
					),
					this.especialidadesService.list().pipe(
						catchError((err) => {
							this.erro.set(err); // Captura o erro
							this.alertService.add('error', 'Erro ao carregar especialidades.');
							return of([]); // Retorna fallback vazio
						})
					)
				])
			),
			map(([regionais, especialidades]) => ({ regionais, especialidades }))
		);
	}

	reloadData() {
		this.erro.set(null); // Reseta o estado de erro
		this.reloadTrigger$.next();
	}

	ngOnDestroy(): void {
		this.alertService.clearAll();
	}

	cancel(): void {
		this.router.navigate(['/']);
	}

	save(): void {
		this.isFormSubmited.set(true);
		if (this.formUtils.valid(this.entityForm)) {
			this.entityForm.disable(); // Desabilita todos os campos enquanto o login está em andamento
			this.isLoading.set(true);

			// Cria o payload
			const payload: IEntityAddPayload = {
				razao_social: this.entityForm.controls['razao_social'].value.trim(),
				nome_fantasia: this.entityForm.controls['nome_fantasia'].value.trim(),
				cnpj: this.entityForm.controls['cnpj'].value.trim(),
				regional_id: this.entityForm.controls['regional_id'].value,
				data_inauguracao: FormUtils.formatDate(this.entityForm.controls['data_inauguracao'].value),
				ativa: this.entityForm.controls['ativa'].value,
				especialidades: this.entityForm.controls['especialidades'].value
			};

			this.entityService.add(payload).subscribe({
				next: () => {
					this.alertService.add('success', 'Operação realizada com sucesso!');
					this.entityForm.reset();
					this.entityForm.patchValue({ ativa: false });
				},
				error: () => {
					this.alertService.add('error', 'Falha em salva entidade!');
					this.entityForm.enable(); // Reabilita o formulário para edição
					this.isLoading.set(false);
					this.isFormSubmited.set(false);
				},
				complete: () => {
					this.entityForm.enable(); // Reabilita o formulário
					this.isLoading.set(false);
					this.isFormSubmited.set(false);
				}
			});
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
