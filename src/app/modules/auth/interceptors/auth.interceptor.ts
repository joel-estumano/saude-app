import { catchError, Observable, switchMap, take } from 'rxjs';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { IAuthDataStore } from '@interfaces';
import { inject } from '@angular/core';
import { selectAuthData } from 'src/app/store/auth-data/auth-data.selectors';
import { Store } from '@ngrx/store';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const store = inject(Store<{ authData: IAuthDataStore }>);

	return store.select(selectAuthData).pipe(
		take(1), // Garante que pegue apenas o valor atual do estado
		switchMap((authData) => {
			let clonedRequest = req;
			if (authData.valid) {
				clonedRequest = req.clone({
					headers: req.headers.set('Authorization', `Bearer ${authData.loginResponse.access_token}`)
				});
			}

			return next(clonedRequest);
		}),
		catchError((error) => {
			console.error('Erro no interceptor:', error);
			return next(req); // Continua com a requisição original em caso de erro
		})
	);
};
