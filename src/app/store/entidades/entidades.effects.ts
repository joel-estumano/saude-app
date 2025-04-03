import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntidadesService } from 'src/app/modules/entidades/services/entidades.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IEntidadesPaginationData } from '@interfaces';
import { Injectable } from '@angular/core';
import { loadEntidadesPaginationSuccess, loadEntidadesPaginationError, loadEntidadesPagination } from './entidades.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class EntidadesEffects {
	constructor(
		private actions$: Actions,
		private entidadesService: EntidadesService
	) {}

	reloadEntities$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadEntidadesPagination),
			switchMap((filters) =>
				this.entidadesService.list(filters).pipe(
					map((pagination: IEntidadesPaginationData) => loadEntidadesPaginationSuccess({ data: pagination })),
					catchError((error: HttpErrorResponse) => of(loadEntidadesPaginationError({ error })))
				)
			)
		)
	);
}
