import { catchError, Observable, Subscriber, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';
import { ILoginResponse, ILoginPayload, IRefreshTokenPayload, IAuthDataStore, IJwtDecode, IAuthData } from '@interfaces';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { loadAuthData } from 'src/app/store/auth-data/auth-data.actions';
import { LocalStorageService } from 'ngx-webstorage';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'platform'
})
export class AuthService {
	constructor(
		private httpService: HttpService,
		private localSt: LocalStorageService,
		private store: Store<{ authData: IAuthDataStore }>
	) {}

	login(login: ILoginPayload): Observable<ILoginResponse> {
		return this.httpService.post<ILoginPayload, ILoginResponse>('login', login).pipe(tap((credentials) => this.setAuthData(credentials)));
	}

	refreshToken(): Observable<ILoginResponse> {
		const authData: IAuthData = this.localSt.retrieve('auth-data');
		const payload: IRefreshTokenPayload = {
			client_id: environment.clientId,
			client_secret: environment.clientSecret,
			grant_type: 'refresh_token',
			refresh_token: authData?.loginResponse?.refresh_token,
			scope: ''
		};
		return this.httpService.post<IRefreshTokenPayload, ILoginResponse>('refresh', payload).pipe(
			tap((credentials) => {
				this.setAuthData(credentials);
			}),
			catchError((error) => {
				this.clearAuthData();
				return throwError(() => error);
			})
		);
	}

	logout(): Observable<void> {
		return this.httpService.get<void>('logout').pipe(
			tap(() => {
				this.clearAuthData();
			})
		);
	}

	private setAuthData(loginResponse: ILoginResponse): void {
		const decoded = jwtDecode<IJwtDecode>(loginResponse.access_token);
		const authData: IAuthData = {
			loginResponse: loginResponse,
			jwtDecode: decoded
		};
		this.localSt.store('auth-data', authData);
		this.store.dispatch(loadAuthData());
	}

	private clearAuthData() {
		this.localSt.clear();
		this.store.dispatch(loadAuthData());
	}

	public loadAuthData(): Observable<IAuthData> {
		return new Observable((subscriber: Subscriber<IAuthData>) => {
			try {
				const authData: IAuthData = this.localSt.retrieve('auth-data');
				if (authData) {
					const currentTime = Math.floor(Date.now() / 1000);
					const expirationTime = authData.jwtDecode.exp;
					if (currentTime < expirationTime) {
						subscriber.next(authData);
						subscriber.complete();
					} else {
						subscriber.error('Token expirado');
					}
				} else {
					subscriber.error('Dados não encontrados no local storage');
				}
			} catch (error) {
				subscriber.error(error);
			}
		}).pipe(tap(console.log));
	}
}
