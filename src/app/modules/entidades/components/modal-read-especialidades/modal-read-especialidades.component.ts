import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IEspecialidadeData } from '@interfaces';

@Component({
	selector: 'app-modal-read-especialidades',
	templateUrl: './modal-read-especialidades.component.html',
	styleUrl: './modal-read-especialidades.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalReadEspecialidadesComponent {
	especialidades = signal<IEspecialidadeData[] | undefined>(undefined);

	close() {
		throw new Error('Method not implemented.');
	}
}
