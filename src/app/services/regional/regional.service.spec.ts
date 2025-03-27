import { TestBed } from '@angular/core/testing';
import { RegionalService } from './regional.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('RegionalService', () => {
	let service: RegionalService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(RegionalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
