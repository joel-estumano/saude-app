import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';

describe('HttpService', () => {
	let service: HttpService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(HttpService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	/**
	 * Verifica se a propriedade apiURL começa com "https://".
	 */
	// it('should have apiURL starting with "https://"', () => {
	// 	const urlPattern = /^https:\/\/.*/;
	// 	expect(service['apiURL']).toMatch(urlPattern);
	// });

	/**
	 * Verifica se o método GET retorna os dados esperados.
	 */
	it('should return expected data from GET', () => {
		const testData = { name: 'Test Data' };

		service.get<{ name: string }>('test-endpoint').subscribe((data) => {
			expect(data).toEqual(testData);
		});

		const req = httpMock.expectOne(`${service['apiURL']}/test-endpoint`);
		expect(req.request.method).toBe('GET');
		req.flush(testData);
	});

	/**
	 * Verifica se o método POST envia e recebe os dados corretos.
	 */
	it('should send and receive data from POST', () => {
		const testData = { name: 'Test Data' };
		const responseData = { id: 1, ...testData };

		service.post<{ name: string }, { id: number; name: string }>('test-endpoint', testData).subscribe((data) => {
			expect(data).toEqual(responseData);
		});

		const req = httpMock.expectOne(`${service['apiURL']}/test-endpoint`);
		expect(req.request.method).toBe('POST');
		req.flush(responseData);
	});

	/**
	 * Verifica se o método PUT envia e recebe os dados corretos.
	 */
	it('should send and receive data from PUT', () => {
		const testData = { name: 'Updated Data' };
		const responseData = { id: 1, ...testData };

		service.put<{ name: string }, { id: number; name: string }>('test-endpoint', testData).subscribe((data) => {
			expect(data).toEqual(responseData);
		});

		const req = httpMock.expectOne(`${service['apiURL']}/test-endpoint`);
		expect(req.request.method).toBe('PUT');
		req.flush(responseData);
	});

	/**
	 * Verifica se o método PATCH envia e recebe os dados corretos.
	 */
	it('should send and receive data from PATCH', () => {
		const testData = { name: 'Partially Updated Data' };
		const responseData = { id: 1, ...testData };

		service.patch<{ name: string }, { id: number; name: string }>('test-endpoint', testData).subscribe((data) => {
			expect(data).toEqual(responseData);
		});

		const req = httpMock.expectOne(`${service['apiURL']}/test-endpoint`);
		expect(req.request.method).toBe('PATCH');
		req.flush(responseData);
	});

	/**
	 * Verifica se o método DELETE remove os dados corretamente.
	 */
	it('should delete data', () => {
		const responseData = { success: true };

		service.delete<{ success: boolean }>('test-endpoint').subscribe((data) => {
			expect(data).toEqual(responseData);
		});

		const req = httpMock.expectOne(`${service['apiURL']}/test-endpoint`);
		expect(req.request.method).toBe('DELETE');
		req.flush(responseData);
	});
});
