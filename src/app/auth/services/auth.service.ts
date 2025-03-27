import { Injectable } from '@angular/core';
import { ICredentials, ILogin } from '@types';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private httpService: HttpService,
		private localSt: LocalStorageService
	) {}

	login(login: ILogin): Observable<ICredentials> {
		return this.httpService.post<ILogin, ICredentials>('login', login).pipe(tap((credentials) => this.storeCredentials(credentials)));
	}

	private storeCredentials(credentials: ICredentials): void {
		this.localSt.store('access_token', credentials.access_token);
		this.localSt.store('refresh_token', credentials.refresh_token);
		this.localSt.store('expires_in', credentials.expires_in);
	}

	isAuthenticated(): boolean {
		return true;
	}

	logout(): void {
		console.log('logout...');
	}

	getCredentialValue(credential: keyof ICredentials): string {
		return this.localSt.retrieve(credential);
	}
}
