import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EntidadeData } from '@interfaces';

@Component({
	selector: 'app-modal-confirm-remove',
	templateUrl: './modal-confirm-remove.component.html',
	styleUrl: './modal-confirm-remove.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmRemoveComponent {
	isLoading = signal<boolean>(false);
	entidade = signal<EntidadeData | undefined>(undefined);

	/* eslint-disable @typescript-eslint/no-empty-function */
	confirm() {}

	/* eslint-disable @typescript-eslint/no-empty-function */
	cancel() {}
}
