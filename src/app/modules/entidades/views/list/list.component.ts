import { Component, signal } from '@angular/core';
import { EntidadeData } from '@interfaces';
import { EntidadesService } from '../../services/entidades.service';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})
export class ListComponent {
	entidades$!: Observable<EntidadeData[]>;

	protected erro = signal<Error | null>(null);

	protected searchField = new FormControl<string>('');

	constructor(
		private router: Router,
		private entidadesService: EntidadesService
	) {
		this.entidades$ = this.entidadesService.list().pipe(map((res) => res.data.data));

		this.searchField.valueChanges
			.pipe(
				map((value: string | null) => value?.trim() || ''), // Garante que o valor seja uma string trimada ou vazio
				filter((value: string) => value.length > 0), // Filtra valores com comprimento maior que 0
				distinctUntilChanged(), // Compara diretamente strings para garantir mudanças
				debounceTime(500) // Introduz um atraso de 500ms após a última mudança
			)
			.subscribe((searchTerm: string) => {
				console.log('searchTerm: ', searchTerm);
				/* if (searchTerm !== this.lastSearch.title) {
              this.lastSearch = { title: searchTerm }; // Atualiza o último termo de busca
              console.log('Nova pesquisa:', searchTerm);
            } */
			});
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

	onPageChanged(page: number) {
		// Busca dados para a nova página
		console.log(page);
	}
}
