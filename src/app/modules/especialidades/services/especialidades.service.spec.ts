import { TestBed } from '@angular/core/testing';
import { EspecialidadesService } from './especialidades.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';

describe('EspecialidadesService', () => {
	let service: EspecialidadesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [EspecialidadesService, HttpService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(EspecialidadesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
