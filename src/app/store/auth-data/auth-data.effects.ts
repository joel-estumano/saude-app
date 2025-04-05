import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IAuthData } from '@interfaces';
import { Injectable } from '@angular/core';
import { loadAuthData, loadAuthDataError, loadAuthDataSuccess } from './auth-data.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthDataEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService
	) {}

	loadAuthData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadAuthData),
			switchMap(() =>
				this.authService.loadAuthData().pipe(
					map((data: IAuthData) => loadAuthDataSuccess(data)),
					catchError((error: string) => of(loadAuthDataError({ error })))
				)
			)
		)
	);
}
