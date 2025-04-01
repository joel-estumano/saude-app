import { TestBed } from '@angular/core/testing';
import { RegionaisService } from './regionais.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';

describe('RegionaisService', () => {
	let service: RegionaisService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [RegionaisService, HttpService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(RegionaisService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
