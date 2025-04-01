import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
	const progressService = inject(ProgressBarService);

	// Ativa a barra de progresso ao iniciar a requisição
	progressService.showProgress();

	return next(req).pipe(
		// Desativa a barra de progresso ao finalizar a requisição
		finalize(() => progressService.hideProgress())
	);
};
