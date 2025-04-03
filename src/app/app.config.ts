import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
	InMemoryScrollingFeature,
	InMemoryScrollingOptions,
	provideRouter,
	TitleStrategy,
	withComponentInputBinding,
	withInMemoryScrolling
} from '@angular/router';
import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { CustomTitleStrategy } from './strategies/title.strategy';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { httpInterceptorProviders } from './modules/auth/interceptors';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';
import { EntidadesModule } from './modules/entidades/entidades.module';

import { EntidadesEffects } from './store/entidades/entidades.effects';
import { entidadesReducer } from './store/entidades/entidades.reducer';

registerLocaleData(ptBr);

const scrollConfig: InMemoryScrollingOptions = {
	scrollPositionRestoration: 'enabled',
	anchorScrolling: 'enabled'
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
		// provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors(httpInterceptorProviders)),
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		{ provide: TitleStrategy, useClass: CustomTitleStrategy },
		importProvidersFrom([
			NgxWebstorageModule.forRoot({
				prefix: 'saude-app',
				separator: '-'
			})
		]),
		provideStore({
			entidades: entidadesReducer // Configuração do reducer para gerenciar o estado "entidadesPagination"
		}),
		provideEffects([
			EntidadesEffects // Configuração dos efeitos relacionados à paginação das entidades
		]),
		importProvidersFrom([
			EntidadesModule // Importa o módulo local que contém configurações específicas do recurso "Entidades"
		])
	]
};
