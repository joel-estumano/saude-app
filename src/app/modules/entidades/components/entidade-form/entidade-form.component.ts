import { AlertService } from 'src/app/services/alert/alert.service';
import { catchError, forkJoin, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { IEntidadeAddPayload, IEntidadeData, IEntidadesPaginationDataStore, IEspecialidadeData, IRegionalData } from '@interfaces';
import { EntidadesService } from '../../services/entidades.service';
import { EspecialidadesService } from 'src/app/modules/especialidades/services/especialidades.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils';
import { RegionaisService } from 'src/app/modules/regionais/services/regionais.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateEntidade } from 'src/app/store/entidades/entidades.actions';

@Component({
	selector: 'app-entidade-form',
	templateUrl: './entidade-form.component.html',
	styleUrls: ['./entidade-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntidadeFormComponent implements OnInit {
	public entidade = input<IEntidadeData | undefined>(undefined);

	public isDisabled = output<boolean>();

	protected isEdit = computed((): boolean => {
		return this.entidade() !== undefined;
	});

	protected form!: FormGroup;

	protected isFormSubmited = signal<boolean>(false);

	protected isLoading = signal<boolean>(false);

	protected formUtils = FormUtils;

	protected regionais$!: Observable<IRegionalData[]>;

	protected especialidades$!: Observable<IEspecialidadeData[]>;

	protected data$ = forkJoin({
		regionais: this.regionais$ ?? of([]),
		especialidades: this.especialidades$ ?? of([])
	}).pipe(map(({ regionais, especialidades }) => ({ regionais, especialidades })));

	private reloadTrigger$ = new Subject<void>();

	protected erro = signal<Error | null>(null);

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private regionalService: RegionaisService,
		private especialidadesService: EspecialidadesService,
		private entidadesService: EntidadesService,
		private alertService: AlertService,
		private store: Store<{ entidades: IEntidadesPaginationDataStore }>
	) {
		this.form = this.fb.group({
			razao_social: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			nome_fantasia: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			cnpj: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			regional_id: new FormControl('', [Validators.required, FormUtils.noSelect('')]),
			data_inauguracao: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			ativa: new FormControl(false),
			especialidades: new FormControl('', [Validators.required, FormUtils.arrayMinLength(5)])
		});

		effect(() => {
			const loadingValue = this.isLoading();
			this.isDisabled.emit(loadingValue);
		});

		this.data$ = this.reloadTrigger$.pipe(
			startWith(undefined),
			switchMap(() =>
				forkJoin({
					regionais: this.regionalService.list(),
					especialidades: this.especialidadesService.list()
				})
			),
			map(({ regionais, especialidades }) => ({ regionais, especialidades })),
			catchError((err) => {
				this.erro.set(err || true);
				this.alertService.send('error', 'Erro ao carregar dados!');
				return of({ regionais: [], especialidades: [] });
			})
		);
	}

	ngOnInit(): void {
		if (this.isEdit()) {
			const formValues: IEntidadeAddPayload = {
				ativa: this.entidade()?.ativa || false,
				cnpj: this.entidade()?.cnpj || '',
				data_inauguracao: this.formUtils.formatDateOut(this.entidade()?.data_inauguracao as string),
				especialidades: this.entidade()?.especialidades.map((e) => e.uuid) || [],
				nome_fantasia: this.entidade()?.nome_fantasia || '',
				razao_social: this.entidade()?.razao_social || '',
				regional_id: this.entidade()?.regional_id || ''
			};
			this.form.patchValue(formValues);
		}
	}

	reloadData(): void {
		this.erro.set(null);
		this.reloadTrigger$.next();
	}

	cancel(): void {
		this.router.navigate(['list']);
	}

	submit(): void {
		this.isFormSubmited.set(true);

		if (this.formUtils.valid(this.form)) {
			this.form.disable();
			this.isLoading.set(true);

			const payload: IEntidadeAddPayload = {
				razao_social: this.form.controls['razao_social'].value.trim(),
				nome_fantasia: this.form.controls['nome_fantasia'].value.trim(),
				cnpj: this.form.controls['cnpj'].value.trim(),
				regional_id: this.form.controls['regional_id'].value,
				data_inauguracao: FormUtils.formatDateIn(this.form.controls['data_inauguracao'].value),
				ativa: this.form.controls['ativa'].value,
				especialidades: this.form.controls['especialidades'].value
			};

			if (this.isEdit()) {
				const entidade = this.entidade() ? this.entidade() : undefined;
				if (entidade) {
					this.entidadesService.edit(entidade.uuid, payload).subscribe({
						next: (result) => {
							this.store.dispatch(updateEntidade({ uuid: entidade.uuid, entidade: result }));
							this.alertService.send('success', 'Operação realizada com sucesso!');
							this.router.navigate(['visualizar', result.uuid]);
						},
						error: () => {
							this.alertService.send('error', 'Falha ao editar entidade!');
							this.form.enable();
							this.isLoading.set(false);
							this.isFormSubmited.set(false);
						},
						complete: () => {
							this.form.enable();
							this.isLoading.set(false);
							this.isFormSubmited.set(false);
						}
					});
				}
			} else {
				this.entidadesService.add(payload).subscribe({
					next: (result) => {
						this.alertService.send('success', 'Operação realizada com sucesso!');
						this.router.navigate(['visualizar', result.uuid]);
					},
					error: () => {
						this.alertService.send('error', 'Falha ao salvar entidade!');
						this.form.enable();
						this.isLoading.set(false);
						this.isFormSubmited.set(false);
					},
					complete: () => {
						this.form.enable();
						this.isLoading.set(false);
						this.isFormSubmited.set(false);
					}
				});
			}
		} else {
			this.invalidFormFeedback();
		}
	}

	private invalidFormFeedback(): void {
		const erros = this.formUtils.listFormErrors(this.form).map((error) => {
			return {
				...error,
				field: (() => {
					switch (error.field) {
						case 'cnpj':
							return 'CNPJ';
						case 'regional_id':
							return 'Regional';
						case 'razao_social':
							return 'Razão Social';
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

		erros.forEach((element) => {
			this.alertService.send('error', `${element.field} ${element.errors.join(', ')}.`);
		});
	}
}
