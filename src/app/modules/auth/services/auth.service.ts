import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';
import { ILoginResponse, ILoginPayload, IRefreshTokenPayload, IUser } from '@interfaces';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { logoutUser, setUser } from 'src/app/store/user/user.actions';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private httpService: HttpService,
		private localSt: LocalStorageService,
		private store: Store<{ user: IUser }>
	) {}

	login(login: ILoginPayload): Observable<ILoginResponse> {
		return this.httpService.post<ILoginPayload, ILoginResponse>('login', login).pipe(tap((credentials) => this.storeCredentials(credentials)));
	}

	logout(): Observable<void> {
		this.store.dispatch(logoutUser());
		return this.httpService.get<void>('logout').pipe(tap(() => this.clearCredentials()));
	}

	refreshToken(): Observable<ILoginResponse | null> {
		const refreshToken = this.getCredentialValue('refresh_token');
		if (!refreshToken) {
			this.clearCredentials();
			return of(null);
		}

		const payload: IRefreshTokenPayload = {
			client_id: environment.clientId,
			client_secret: environment.clientSecret,
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			scope: ''
		};

		return this.httpService.post<IRefreshTokenPayload, ILoginResponse>('refresh', payload).pipe(
			tap((credentials) => {
				this.storeCredentials(credentials); // Salva novas credenciais
			}),
			catchError(() => {
				this.clearCredentials();
				return of(null);
			})
		);
	}

	private storeCredentials(loginResponse: ILoginResponse): void {
		const expirationTime = Date.now() + loginResponse.expires_in * 1000;
		this.localSt.store('access_token', loginResponse.access_token);
		this.localSt.store('refresh_token', loginResponse.refresh_token);
		this.localSt.store('expires_in', loginResponse.expires_in);
		this.localSt.store('expiration_time', expirationTime);
		this.localSt.store('user', loginResponse.user);
		//
		this.store.dispatch(setUser({ user: loginResponse.user }));
	}

	private clearCredentials(): void {
		this.localSt.clear();
	}

	isAuthenticated(): boolean {
		const token = this.localSt.retrieve('access_token'); // Recupera o access token
		const expirationTime = this.localSt.retrieve('expiration_time'); // Recupera o tempo de expiração armazenado

		if (!token || !expirationTime) {
			return false; // Usuário não está autenticado se não houver token ou tempo de expiração
		}

		const currentTime = Date.now(); // Tempo atual em milissegundos
		return currentTime < expirationTime; // Retorna true se o token ainda estiver válido
	}

	getCredentialValue(credential: keyof ILoginResponse): string {
		return this.localSt.retrieve(credential);
	}
}
