import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
		children: [
			{
				path: '',
				loadChildren: () => import('./modules/entidades/entidades.module').then((m) => m.EntidadesModule)
			}
		],
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./modules/auth/auth.module').then((c) => c.AuthModule)
	},
	{ path: '**', redirectTo: '' }
];
