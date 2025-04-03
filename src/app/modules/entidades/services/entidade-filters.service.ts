import { Injectable } from '@angular/core';
import { IEntidadesPaginationFilters } from '@interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'platform'
})
export class EntidadeFiltersService {
	private subject!: BehaviorSubject<IEntidadesPaginationFilters>;

	constructor() {
		this.subject = new BehaviorSubject({
			page: 1,
			per_page: 4,
			text: ''
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
			page: page
		});
	}
}
