import { AuthService } from '../services/auth.service';
import { CanActivateFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (): MaybeAsync<GuardResult> => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (!authService.isAuthenticated()) {
		router.navigate(['/login']);
		return false;
	}
	return true;
};
