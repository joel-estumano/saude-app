import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { catchError, EMPTY, Observable, of, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { Component, Input, OnDestroy, signal } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';
import { getEntidadeByUuid } from 'src/app/store/entidades/entidades.selectors';
import { IEntidadeData } from '@interfaces';
import { ModalConfirmRemoveComponent } from '../../components/modal-confirm-remove/modal-confirm-remove.component';
import { ModalService } from 'src/app/shared/modal/services/modal.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss'
})
export class EditComponent implements OnDestroy {
	uuid = signal<string>('');

	entidade$!: Observable<IEntidadeData>;

	protected erro = signal<Error | null>(null);

	protected formIsDisabled = signal<boolean>(false);

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
		private alertService: AlertService
	) {
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

	remove(entidade: IEntidadeData): void {
		this.openModal(entidade);
	}

	cancel(): void {
		this.router.navigate(['list']);
	}

	private openModal(entidade: IEntidadeData): void {
		this.modalService.open(ModalConfirmRemoveComponent);
		const instance = this.modalService.getInstance<ModalConfirmRemoveComponent>();
		if (instance) {
			instance.entidade.set(entidade);

			instance.confirm = () => {
				instance.isLoading.set(true);

				this.entidadesService.remove(entidade.uuid).subscribe({
					next: () => {
						this.modalService.close();
						this.alertService.send('success', 'Operação realizada com sucesso!');
						this.router.navigate(['list']);
					},
					error: () => {
						this.modalService.close();
						this.alertService.send('error', 'Falha ao excluir entidade!');
					},
					complete: () => {
						instance.isLoading.set(false);
					}
				});
			};

			instance.cancel = () => {
				this.modalService.close();
			};
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
