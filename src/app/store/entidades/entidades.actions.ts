import { HttpErrorResponse } from '@angular/common/http';
import { IEntidadeData, IEntidadesPaginationDataStore, IEntidadesPaginationFilters } from '@interfaces';
import { createAction, props } from '@ngrx/store';

export const loadEntidadesPagination = createAction('[Entidades Pagination] Load', props<IEntidadesPaginationFilters>());
export const loadEntidadesPaginationSuccess = createAction('[Entidades Pagination] Load Success', props<IEntidadesPaginationDataStore>());
export const loadEntidadesPaginationError = createAction('[Entidades Pagination] Load Error', props<{ error: HttpErrorResponse }>());

export const updateEntidade = createAction('[Entidades Pagination] Update Entity', props<{ uuid: string; entidade: Partial<IEntidadeData> }>());
