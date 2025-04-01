import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EntidadeData } from '@interfaces';
import { Observable } from 'rxjs';
import { EntidadesService } from '../../services/entidades.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss'
})
export class EditComponent {
	entidade$!: Observable<EntidadeData>;

	protected erro = signal<Error | null>(null);

	@Input({ required: true })
	set id(id: string) {
		this.loadData(id);
	}

	constructor(
		private router: Router,
		private entidadesService: EntidadesService
	) {}

	private loadData(id: string): void {
		this.entidade$ = this.entidadesService.read(id);
	}

	remove(uuid: string): void {
		console.log(uuid);
	}

	cancel(): void {
		this.router.navigate(['/']);
	}
}
