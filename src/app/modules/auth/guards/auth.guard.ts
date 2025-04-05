import { CanActivateFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { IAuthDataStore } from '@interfaces';
import { inject } from '@angular/core';
import { loadAuthData } from 'src/app/store/auth-data/auth-data.actions';
import { selectAuthData } from 'src/app/store/auth-data/auth-data.selectors';
import { Store } from '@ngrx/store';

export const AuthGuard: CanActivateFn = (): MaybeAsync<GuardResult> => {
	const router = inject(Router);
	const store = inject(Store<{ authData: IAuthDataStore }>);

	// Dispatch para carregar os dados de autenticação
	store.dispatch(loadAuthData());

	// Retorna um observable que monitora o estado de autenticação
	return store.select(selectAuthData).pipe(
		map((authData) => {
			if (authData.valid) {
				return true; // Permitir acesso
			} else {
				router.navigate(['login']); // Redirecionar paralogin
				return false; // Bloquear acesso
			}
		}),
		catchError(() => {
			router.navigate(['login']); // Em caso de erro, redirecionar
			return [false]; // Bloquear acesso
		})
	);
};
