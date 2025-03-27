import { TestBed } from '@angular/core/testing';
import { EntitiesService } from './entities.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EntitiesService', () => {
	let service: EntitiesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(EntitiesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
