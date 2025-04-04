import { IUser } from '@interfaces';
import { createReducer, on } from '@ngrx/store';
import { logoutUser, setUser } from './user.actions';

export const initialState: IUser | null = null;

export const userReducer = createReducer<IUser | null>(
	initialState,
	// Atualiza o estado com os dados fornecidos pela ação `setUser`
	on(setUser, (state, { user }) => user),
	// Responde à ação `logoutUser` atribuindo `null` ao estado
	on(logoutUser, () => null)
);
