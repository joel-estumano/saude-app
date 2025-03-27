import { AuthService } from '../services/auth.service';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const authService = inject(AuthService);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401) {
				return authService.refreshToken().pipe(
					switchMap((newCredentials) => {
						if (newCredentials) {
							// Reenvia a requisição original com o novo token
							const clonedRequest = req.clone({
								headers: req.headers.set('Authorization', `Bearer ${newCredentials.access_token}`)
							});
							return next(clonedRequest);
						}
						// Caso não consiga renovar, propaga o erro
						return throwError(() => error);
					})
				);
			}
			// Para outros erros, apenas propaga o erro
			return throwError(() => error);
		})
	);
};
