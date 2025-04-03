import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IEntidadeData } from '@interfaces';

@Component({
	selector: 'app-modal-confirm-remove',
	templateUrl: './modal-confirm-remove.component.html',
	styleUrl: './modal-confirm-remove.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmRemoveComponent {
	isLoading = signal<boolean>(false);
	entidade = signal<IEntidadeData | undefined>(undefined);

	/* eslint-disable @typescript-eslint/no-empty-function */
	confirm() {}

	/* eslint-disable @typescript-eslint/no-empty-function */
	cancel() {}
}
