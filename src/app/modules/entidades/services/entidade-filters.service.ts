import { Injectable } from '@angular/core';
import { IEntidadesPaginationFilters } from '@interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'platform'
})
export class EntidadeFiltersService {
	private subject: BehaviorSubject<IEntidadesPaginationFilters>;

	constructor() {
		this.subject = new BehaviorSubject<IEntidadesPaginationFilters>({
			page: 1,
			per_page: 4,
			text: '',
			sort_field: 'created_at',
			sort_order: 'asc'
		});
	}

	valueChanges$(): Observable<IEntidadesPaginationFilters> {
		return this.subject.asObservable();
	}

	filterByText(text: string): void {
		this.subject.next({
			...this.subject.value,
			page: 1,
			text
		});
	}

	filterByPage(page: number): void {
		this.subject.next({
			...this.subject.value,
			page
		});
	}

	filterBySort(field: string, order: 'asc' | 'desc'): void {
		this.subject.next({
			...this.subject.value,
			sort_field: field,
			sort_order: order
		});
	}

	getValues(): IEntidadesPaginationFilters {
		return this.subject.value;
	}
}
