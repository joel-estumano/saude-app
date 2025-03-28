import { TestBed } from '@angular/core/testing';
import { EspecialidadesService } from './especialidades.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EspecialidadesService', () => {
	let service: EspecialidadesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(EspecialidadesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
