import { TestBed } from '@angular/core/testing';

import { EntityService } from './entity.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EntityService', () => {
	let service: EntityService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(EntityService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
