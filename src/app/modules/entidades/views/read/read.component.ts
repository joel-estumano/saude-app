import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EntidadeData } from '@interfaces';
import { Observable } from 'rxjs';
import { EntidadesService } from '../../services/entidades.service';

@Component({
	selector: 'app-read',
	templateUrl: './read.component.html',
	styleUrl: './read.component.scss'
})
export class ReadComponent {
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

	editar(uuid: string): void {
		this.router.navigate(['editar', uuid]);
	}

	cancel(): void {
		this.router.navigate(['/']);
	}
}
