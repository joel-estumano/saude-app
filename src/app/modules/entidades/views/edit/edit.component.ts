import { Component, Input, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EntidadeData } from '@interfaces';
import { Observable } from 'rxjs';
import { EntidadesService } from '../../services/entidades.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalConfirmRemoveComponent } from '../../components/modal-confirm-remove/modal-confirm-remove.component';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss'
})
export class EditComponent implements OnDestroy {
	entidade$!: Observable<EntidadeData>;

	protected erro = signal<Error | null>(null);

	protected formIsDisabled = signal<boolean>(false);

	@Input({ required: true })
	set id(id: string) {
		this.loadData(id);
	}

	constructor(
		private router: Router,
		private entidadesService: EntidadesService,
		private alertService: AlertService,
		private modalService: ModalService
	) {}

	private loadData(id: string): void {
		this.entidade$ = this.entidadesService.read(id);
	}

	remove(entidade: EntidadeData): void {
		this.openModal(entidade);
	}

	cancel(): void {
		this.router.navigate(['/']);
	}

	private openModal(entidade: EntidadeData): void {
		this.modalService.open(ModalConfirmRemoveComponent);
		const instance = this.modalService.getInstance<ModalConfirmRemoveComponent>();
		if (instance) {
			instance.entidade.set(entidade);
			// Sobrescreve o método confirm
			instance.confirm = () => {
				instance.isLoading.set(true);

				this.entidadesService.remove(entidade.uuid).subscribe({
					next: () => {
						this.alertService.add('success', 'Operação realizada com sucesso!', 1500).subscribe(() => {
							this.modalService.close();
							this.router.navigate(['list']);
						});
					},
					error: () => {
						this.alertService.add('error', 'Falha ao excluir entidade!');
						this.modalService.close();
					},
					complete: () => {
						instance.isLoading.set(false);
					}
				});
			};

			// Sobrescreve o método cancel
			instance.cancel = () => {
				this.modalService.close();
			};
		}
	}

	ngOnDestroy(): void {
		this.alertService.clearAll();
	}
}
