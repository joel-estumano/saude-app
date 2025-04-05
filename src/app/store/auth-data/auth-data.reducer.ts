import { createReducer, on } from '@ngrx/store';
import { IAuthDataStore } from '@interfaces';
import { loadAuthData, loadAuthDataError, loadAuthDataSuccess } from './auth-data.actions';

export const initialState: IAuthDataStore = {
	loginResponse: {
		token_type: 'Bearer',
		expires_in: 0,
		access_token: '',
		refresh_token: '',
		user: {
			id: 0,
			email: '',
			name: ''
		}
	},
	jwtDecode: {
		aud: '',
		jti: '',
		iat: 0,
		nbf: 0,
		exp: 0,
		sub: '',
		scopes: []
	},
	valid: false,
	error: ''
};

export const authDataReducer = createReducer<IAuthDataStore>(
	initialState,
	on(loadAuthData, (state) => ({
		...state
	})),
	on(loadAuthDataSuccess, (_, { loginResponse, jwtDecode }) => ({
		loginResponse,
		jwtDecode,
		valid: true,
		error: ''
	})),
	on(loadAuthDataError, (state, { error }) => ({
		...state,
		valid: false,
		error: error
	}))
);
