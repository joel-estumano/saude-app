import { AlertService } from 'src/app/services/alert/alert.service';
import { catchError, forkJoin, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component, computed, effect, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { EntidadeAddPayload, EntidadeData, IEspecialidadeData, IRegionalData } from '@interfaces';
import { EntidadesService } from '../../services/entidades.service';
import { EspecialidadesService } from 'src/app/modules/especialidades/services/especialidades.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils';
import { RegionaisService } from 'src/app/modules/regionais/services/regionais.service';
import { Router } from '@angular/router';

/**
 * Componente de formulário para criação e edição de entidades.
 *
 * Este componente gerencia o formulário para criar ou editar entidades, além de interagir com
 * serviços responsáveis por dados regionais e especialidades. Ele também controla estados reativos
 * como carregamento e submissão do formulário.
 */
@Component({
	selector: 'app-entidade-form',
	templateUrl: './entidade-form.component.html',
	styleUrls: ['./entidade-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntidadeFormComponent implements OnInit, OnDestroy {
	/**
	 * Entidade atualmente sendo editada ou criada.
	 * Caso esteja presente, indica que o formulário está no modo de edição.
	 */
	public entidade = input<EntidadeData | undefined>(undefined);

	/**
	 * Emite eventos indicando se o formulário ou processo está desabilitado.
	 * Geralmente usado para desabilitar interações enquanto o carregamento está ativo.
	 */
	public isDisabled = output<boolean>();

	/**
	 * Indica se o formulário está no modo de edição.
	 * O valor será `true` caso `entidade` esteja definida.
	 */
	protected isEdit = computed((): boolean => {
		return this.entidade() !== undefined;
	});

	/**
	 * Instância do formulário reativo usado para coletar os dados.
	 */
	protected form!: FormGroup;

	/**
	 * Indica se o formulário foi submetido.
	 * Usado para validar e exibir feedback ao usuário após tentativas de envio.
	 */
	protected isFormSubmited = signal<boolean>(false);

	/**
	 * Indica o estado de carregamento do componente.
	 * Enquanto `true`, impede ações adicionais no formulário.
	 */
	protected isLoading = signal<boolean>(false);

	/**
	 * Utilitários auxiliares para manipulação de formulários.
	 */
	protected formUtils = FormUtils;

	/**
	 * Observable que contém dados de regionais disponíveis para seleção.
	 */
	protected regionais$!: Observable<IRegionalData[]>;

	/**
	 * Observable que contém dados de especialidades disponíveis para seleção.
	 */
	protected especialidades$!: Observable<IEspecialidadeData[]>;

	/**
	 * Combina os dados de regionais e especialidades em um único Observable.
	 * Útil para inicializar o formulário com dados pré-carregados.
	 */
	protected data$ = forkJoin({
		regionais: this.regionais$ ?? of([]),
		especialidades: this.especialidades$ ?? of([])
	}).pipe(map(({ regionais, especialidades }) => ({ regionais, especialidades })));

	/**
	 * Sinal para disparar recarregamento de dados.
	 * Usado para reiniciar o fluxo de dados do formulário.
	 */
	private reloadTrigger$ = new Subject<void>();

	/**
	 * Sinal para capturar e exibir erros do componente.
	 * Usado para gerenciar feedback ao usuário em cenários de erro.
	 */
	protected erro = signal<Error | null>(null);

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private regionalService: RegionaisService,
		private especialidadesService: EspecialidadesService,
		private entidadesService: EntidadesService,
		private alertService: AlertService
	) {
		/**
		 * Inicializa o formulário com as configurações padrão e validações.
		 */
		this.form = this.fb.group({
			razao_social: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			nome_fantasia: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			cnpj: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			regional_id: new FormControl('', [Validators.required, FormUtils.noSelect('')]),
			data_inauguracao: new FormControl('', [Validators.required, FormUtils.notEmpty]),
			ativa: new FormControl(false),
			especialidades: new FormControl('', [Validators.required, FormUtils.arrayMinLength(5)])
		});

		/**
		 * Observa mudanças no estado de carregamento para emitir eventos públicos.
		 */
		effect(() => {
			const loadingValue = this.isLoading();
			this.isDisabled.emit(loadingValue);
		});

		/**
		 * Combina dados regionais e especialidades e captura erros na inicialização.
		 */
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
				this.alertService.add('error', 'Erro ao carregar dados!', 1500).subscribe();
				return of({ regionais: [], especialidades: [] });
			})
		);
	}

	/**
	 * Configura o formulário com valores iniciais quando em modo de edição.
	 */
	ngOnInit(): void {
		if (this.isEdit()) {
			const formValues: EntidadeAddPayload = {
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

	/**
	 * Recarrega os dados de regionais e especialidades.
	 * Reseta o estado de erro e dispara o trigger de recarregamento.
	 */
	reloadData(): void {
		this.erro.set(null);
		this.reloadTrigger$.next();
	}

	/**
	 * Cancela a operação e retorna à página inicial.
	 */
	cancel(): void {
		this.router.navigate(['/']);
	}

	/**
	 * Submete os dados do formulário, salvando ou editando uma entidade.
	 * Exibe mensagens de sucesso ou erro com base nos resultados da operação.
	 */
	submit(): void {
		this.isFormSubmited.set(true);

		if (this.formUtils.valid(this.form)) {
			this.form.disable();
			this.isLoading.set(true);

			const payload: EntidadeAddPayload = {
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
							this.alertService.add('success', 'Operação realizada com sucesso!', 1500).subscribe(() => {
								this.router.navigate(['visualizar', result.uuid]);
							});
						},
						error: () => {
							this.alertService.add('error', 'Falha ao editar entidade!').subscribe(() => {
								this.form.enable();
								this.isLoading.set(false);
								this.isFormSubmited.set(false);
							});
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
						this.alertService.add('success', 'Operação realizada com sucesso!', 1500).subscribe(() => {
							this.router.navigate(['visualizar', result.uuid]);
						});
					},
					error: () => {
						this.alertService.add('error', 'Falha ao salvar entidade!').subscribe(() => {
							this.form.enable();
							this.isLoading.set(false);
							this.isFormSubmited.set(false);
						});
					},
					complete: () => {
						this.form.enable();
						this.isLoading.set(false);
						this.isFormSubmited.set(false);
					}
				});
			}
		} else {
			this.invalidFormFeedback(); // Exibe mensagem de erro caso o formulário seja inválido
		}
	}

	/**
	 * Exibe feedback sobre campos inválidos no formulário.
	 */
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
			this.alertService.add('error', `${element.field} ${element.errors.join(', ')}.`).subscribe();
		});
	}

	/**
	 * Limpa todos os alert
	 */
	ngOnDestroy(): void {
		this.alertService.clearAll();
	}
}
