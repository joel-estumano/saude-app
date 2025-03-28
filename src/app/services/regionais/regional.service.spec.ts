import { TestBed } from '@angular/core/testing';
import { RegionaisService } from './regionais.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('RegionaisService', () => {
	let service: RegionaisService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(RegionaisService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
