import { AlertService } from 'src/app/services/alert/alert.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { catchError, EMPTY, Observable, Subject, switchMap, takeUntil, of, startWith } from 'rxjs';
import { Component, Input, signal, OnDestroy } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';
import { getEntidadeByUuid } from 'src/app/store/entidades/entidades.selectors';
import { IEntidadeData } from '@interfaces';
import { ModalReadEspecialidadesComponent } from '../../components/modal-read-especialidades/modal-read-especialidades.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-read',
	templateUrl: './read.component.html',
	styleUrl: './read.component.scss'
})
export class ReadComponent extends BaseComponent implements OnDestroy {
	uuid = signal<string>('');

	entidade$!: Observable<IEntidadeData | null>;

	protected erro = signal<Error | null>(null);

	private reloadTrigger$ = new Subject<void>();

	private destroy$ = new Subject<void>();

	@Input({ required: true })
	set id(id: string) {
		this.uuid.set(id);
		this.reloadTrigger$.next();
	}

	constructor(
		private router: Router,
		private entidadesService: EntidadesService,
		private modalService: ModalService,
		private store: Store,
		protected override alertService: AlertService
	) {
		super(alertService);
		this.entidade$ = this.reloadTrigger$.pipe(
			startWith(void 0),
			switchMap(() => {
				const currentUuid = this.uuid();
				if (!currentUuid) {
					this.router.navigate(['list']);
					return EMPTY;
				}
				return this.store.select(getEntidadeByUuid(currentUuid)).pipe(
					switchMap((entidade) => (entidade ? of(entidade) : this.entidadesService.read(currentUuid))),
					catchError((error) => {
						this.alertService.send('error', 'Erro ao carregar dados!');
						this.erro.set(error);
						return EMPTY;
					})
				);
			}),
			takeUntil(this.destroy$)
		);
	}

	recarregar(): void {
		this.erro.set(null);
		this.reloadTrigger$.next();
	}

	editar(uuid: string): void {
		this.router.navigate(['editar', uuid]);
	}

	cancel(): void {
		this.router.navigate(['/list']);
	}

	openModal(entidade: IEntidadeData): void {
		this.modalService.open(ModalReadEspecialidadesComponent);

		const instance = this.modalService.getInstance<ModalReadEspecialidadesComponent>();
		if (instance) {
			instance.especialidades.set(entidade.especialidades);
			instance.close = () => {
				this.modalService.close();
			};
		}
	}

	ngOnDestroy(): void {
		this.alertService.clearAll();
		this.destroy$.next();
		this.destroy$.complete();
	}
}
