import { Component, OnDestroy, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { EntidadeFiltersService } from '../../services/entidade-filters.service';
import { FormControl } from '@angular/forms';
import { getEntidadesPagination } from 'src/app/store/entidades/entidades.selectors';
import { IEntidadesPaginationDataStore } from '@interfaces';
import { loadEntidadesPagination } from 'src/app/store/entidades/entidades.actions';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
	protected entidadesPagination$!: Observable<IEntidadesPaginationDataStore>;

	protected erro = signal<Error | null>(null);

	protected searchField = new FormControl<string>('');

	private destroy$ = new Subject<void>();

	constructor(
		private router: Router,
		private store: Store<{ entidades: IEntidadesPaginationDataStore }>,
		private entidadeFiltersService: EntidadeFiltersService
	) {
		this.entidadesPagination$ = this.store.select(getEntidadesPagination);

		this.entidadeFiltersService
			.valueChanges$()
			.pipe(
				distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
				takeUntil(this.destroy$)
			)
			.subscribe((filters) => {
				this.store.dispatch(loadEntidadesPagination(filters));
			});

		this.searchField.valueChanges
			.pipe(
				map((value: string | null) => value?.trim() || ''),
				distinctUntilChanged(),
				debounceTime(500),
				takeUntil(this.destroy$)
			)
			.subscribe((searchTerm: string) => {
				this.filterByText(searchTerm);
			});

		this.store
			.select(getEntidadesPagination)
			.pipe(takeUntil(this.destroy$))
			.subscribe((paginationState) => {
				if (paginationState.isLoading) {
					this.searchField.disable();
				} else {
					this.searchField.enable();
				}
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	filterByText(text: string): void {
		this.entidadeFiltersService.filterByText(text);
	}

	filterByPage(page: number): void {
		this.entidadeFiltersService.filterByPage(page);
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
