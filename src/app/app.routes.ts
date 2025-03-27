import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./layout/pages/entity-list/entity-list.component').then((c) => c.EntityListComponent)
			},
			{
				path: 'adicionar',
				loadComponent: () => import('./layout/pages/entity-add/entity-add.component').then((c) => c.EntityAddComponent),
				title: 'Nova Entidade'
			},
			{
				path: 'editar/:id',
				loadComponent: () => import('./layout/pages/entity-edit/entity-edit.component').then((c) => c.EntityEditComponent),
				title: 'Editar Entidade'
			},
			{
				path: 'visualizar/:id',
				loadComponent: () => import('./layout/pages/entity-read/entity-read.component').then((c) => c.EntityReadComponent),
				title: 'Visualizar Entidade'
			}
		],
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/pages/login/login.component').then((c) => c.LoginComponent),
		title: 'Login'
	},
	{
		path: 'criar-conta',
		loadComponent: () => import('./auth/pages/register/register.component').then((c) => c.RegisterComponent),
		title: 'Criar conta'
	},
	{ path: '**', redirectTo: '' }
];
