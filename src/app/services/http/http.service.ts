import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private readonly apiURL: string;
	private readonly headers: HttpHeaders;

	/**
	 * @param httpClient - Cliente HTTP Angular para fazer requisições.
	 */
	constructor(private httpClient: HttpClient) {
		this.apiURL = environment.apiURL;
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	}

	/**
	 * Faz uma requisição GET.
	 * @param url - O endpoint a ser acessado.
	 * @returns Observable<T> - Observable contendo a resposta tipada.
	 */
	public get<T>(url: string): Observable<T> {
		return this.httpClient
			.get<T>(`${this.apiURL}/${url}`, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	/**
	 * Faz uma requisição PUT.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public put<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.put<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	/**
	 * Faz uma requisição PATCH.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public patch<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.patch<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	/**
	 * Faz uma requisição POST.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public post<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.post<TOutput>(`${this.apiURL}/${url}`, body, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	/**
	 * Faz uma requisição DELETE.
	 * @param url - O endpoint a ser acessado.
	 * @returns Observable<T> - Observable contendo a resposta tipada.
	 */
	public delete<T>(url: string): Observable<T> {
		return this.httpClient
			.delete<T>(`${this.apiURL}/${url}`, {
				headers: this.headers
			})
			.pipe(
				catchError((err: HttpErrorResponse) => {
					return this.errorHandler(err);
				})
			);
	}

	/**
	 * Manipula erros de requisição HTTP.
	 * @param error - O erro HTTP.
	 * @returns Observable<never> - Observable que lança um erro.
	 */
	private errorHandler(error: HttpErrorResponse): Observable<never> {
		// return throwError(() => new Error(error.message));
		return throwError(() => error.error);
	}
}
