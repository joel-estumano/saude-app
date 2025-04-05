import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [HttpService, provideHttpClient(), provideHttpClientTesting(), LocalStorageService, AuthService, { provide: Store, useValue: {} }]
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
