import { TestBed } from '@angular/core/testing';

import { EntidadeFiltersService } from './entidade-filters.service';

describe('EntidadeFiltersService', () => {
	let service: EntidadeFiltersService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EntidadeFiltersService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
