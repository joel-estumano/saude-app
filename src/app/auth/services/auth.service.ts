import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	//constructor() {}

	isAuthenticated(): boolean {
		return true;
	}

	logout(): void {
		console.log('logout...');
	}

	getToken(): string {
		return '';
	}
}
