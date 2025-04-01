import { Component, signal } from '@angular/core';
import { EntidadeData } from '@interfaces';
import { EntidadesService } from '../../services/entidades.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})
export class ListComponent {
	entidades$!: Observable<EntidadeData[]>;

	protected erro = signal<Error | null>(null);

	constructor(
		private router: Router,
		private entidadesService: EntidadesService
	) {
		this.entidades$ = this.entidadesService.list().pipe(map((res) => res.data.data));
	}

	add(): void {
		this.router.navigate(['adicionar']);
	}

	read(uuid: string): void {
		this.router.navigate(['visualizar', uuid]);
	}

	edit(uuid: string): void {
		this.router.navigate(['editar', uuid]);
	}
}
