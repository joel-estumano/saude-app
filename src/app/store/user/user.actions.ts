import { IUser } from '@interfaces';
import { createAction, props } from '@ngrx/store';

// Define a ação de login do usuário
export const setUser = createAction('[User] Set', props<{ user: IUser | null }>());

// Define a ação para logout do usuário
export const logoutUser = createAction('[User] Logout');
