import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Component, effect, OnDestroy, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, skip, takeUntil } from 'rxjs/operators';
import { EntidadeFiltersService } from '../../services/entidade-filters.service';
import { FormControl } from '@angular/forms';
import { getEntidadesErrorSelector, getEntidadesPaginationSelector } from 'src/app/store/entidades/entidades.selectors';
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

	protected searchField = new FormControl<string>('');

	private destroy$ = new Subject<void>();

	orderNomeFantasia = signal<{ on: boolean; order: 'asc' | 'desc' }>({
		on: false,
		order: 'asc'
	});

	orderRegional = signal<{ on: boolean; order: 'asc' | 'desc' }>({
		on: false,
		order: 'asc'
	});

	orderCreatedAt = signal<{ on: boolean; order: 'asc' | 'desc' }>({
		on: true,
		order: 'desc'
	});

	constructor(
		private router: Router,
		private alertService: AlertService,
		private store: Store<{ entidades: IEntidadesPaginationDataStore }>,
		private entidadeFiltersService: EntidadeFiltersService
	) {
		this.entidadesPagination$ = this.store.select(getEntidadesPaginationSelector);

		this.store.select(getEntidadesErrorSelector).subscribe((error) => {
			if (error) {
				alertService.send('error', 'Ocorreu um erro inesperado!');
			}
		});

		this.entidadeFiltersService
			.valueChanges$()
			.pipe(
				distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
				takeUntil(this.destroy$)
			)
			.subscribe((filters) => {
				this.store.dispatch(loadEntidadesPagination(filters));
			});

		this.searchField.setValue(this.entidadeFiltersService.getValues().text);

		this.searchField.valueChanges
			.pipe(
				map((value: string | null) => value?.trim() || ''),
				distinctUntilChanged(),
				debounceTime(500),
				skip(1),
				takeUntil(this.destroy$)
			)
			.subscribe((searchTerm: string) => {
				this.filterByText(searchTerm);
			});

		this.store
			.select(getEntidadesPaginationSelector)
			.pipe(takeUntil(this.destroy$))
			.subscribe((paginationState) => {
				if (paginationState.isLoading) {
					this.searchField.disable();
				} else {
					this.searchField.enable();
				}
			});

		effect(
			() => {
				if (this.orderNomeFantasia().on) {
					this.entidadeFiltersService.filterBySort('nome_fantasia', this.orderNomeFantasia().order);
				} else if (this.orderRegional().on) {
					this.entidadeFiltersService.filterBySort('regional', this.orderRegional().order);
				} else if (this.orderCreatedAt().on) {
					this.entidadeFiltersService.filterBySort('created_at', this.orderCreatedAt().order);
				}
			},
			{ allowSignalWrites: true } // Habilita escrita de sinais dentro do effect
		);
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

	manageOrderState(activeState: 'nomeFantasia' | 'regional' | 'created_at') {
		if (activeState === 'nomeFantasia') {
			this.orderNomeFantasia.update((currentState) => ({
				...currentState,
				on: true,
				order: currentState.on ? (currentState.order === 'asc' ? 'desc' : 'asc') : 'asc'
			}));
			this.orderRegional.update((currentState) => ({
				...currentState,
				on: false
			}));
			this.orderCreatedAt.update((currentState) => ({
				...currentState,
				on: false
			}));
		} else if (activeState === 'regional') {
			this.orderRegional.update((currentState) => ({
				...currentState,
				on: true,
				order: currentState.on ? (currentState.order === 'asc' ? 'desc' : 'asc') : 'asc'
			}));
			this.orderNomeFantasia.update((currentState) => ({
				...currentState,
				on: false
			}));
			this.orderCreatedAt.update((currentState) => ({
				...currentState,
				on: false
			}));
		} else if (activeState === 'created_at') {
			this.orderCreatedAt.update((currentState) => ({
				...currentState,
				on: true,
				order: currentState.on ? (currentState.order === 'asc' ? 'desc' : 'asc') : 'asc'
			}));
			this.orderNomeFantasia.update((currentState) => ({
				...currentState,
				on: false
			}));
			this.orderRegional.update((currentState) => ({
				...currentState,
				on: false
			}));
		}
	}

	cleansearch() {
		this.searchField.setValue('', { emitEvent: true });
	}
}
