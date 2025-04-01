import { TestBed } from '@angular/core/testing';
import { EntidadesService } from './entidades.service';
import { HttpService } from 'src/app/services/http/http.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EntidadesService', () => {
	let service: EntidadesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [EntidadesService, HttpService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(EntidadesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
