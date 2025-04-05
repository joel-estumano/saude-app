import { createAction, props } from '@ngrx/store';
import { IAuthData } from '@interfaces';

export const loadAuthData = createAction('[AuthData] Load');
export const loadAuthDataSuccess = createAction('[AuthData] Load Success', props<IAuthData>());
export const loadAuthDataError = createAction('[AuthData] Load Error', props<{ error: string }>());
