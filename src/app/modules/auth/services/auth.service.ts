import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';
import { ICredentials, ILoginPayload, IRefreshTokenPayload } from '@interfaces';
import { Injectable } from '@angular/core';
// import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private httpService: HttpService,
		private localSt: LocalStorageService
	) {}

	login(login: ILoginPayload): Observable<ICredentials> {
		return this.httpService.post<ILoginPayload, ICredentials>('login', login).pipe(tap((credentials) => this.storeCredentials(credentials)));
	}

	logout(): Observable<void> {
		return this.httpService.get<void>('logout').pipe(tap(() => this.clearCredentials()));
	}

	refreshToken(): Observable<ICredentials | null> {
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

		return this.httpService.post<IRefreshTokenPayload, ICredentials>('refresh', payload).pipe(
			tap((credentials) => {
				this.storeCredentials(credentials); // Salva novas credenciais
			}),
			catchError(() => {
				this.clearCredentials();
				return of(null);
			})
		);
	}

	private storeCredentials(credentials: ICredentials): void {
		const expirationTime = Date.now() + credentials.expires_in * 1000;
		this.localSt.store('access_token', credentials.access_token);
		this.localSt.store('refresh_token', credentials.refresh_token);
		this.localSt.store('expires_in', credentials.expires_in);
		this.localSt.store('expiration_time', expirationTime);
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

	getCredentialValue(credential: keyof ICredentials): string {
		return this.localSt.retrieve(credential);
	}

	/* private decodeToken(token: string): any {
		try {
			return jwtDecode(token); // Decodifica o token usando a biblioteca
		} catch (error) {
			console.error('Erro ao decodificar o token:', error);
			return null; // Retorna null em caso de erro
		}
	} */
}
