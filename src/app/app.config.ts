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
import { provideClientHydration } from '@angular/platform-browser';
import { CustomTitleStrategy } from './strategies/title.strategy';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { httpInterceptorProviders } from './auth/interceptors';
import { NgxWebstorageModule } from 'ngx-webstorage';
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
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors(httpInterceptorProviders)),
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		{ provide: TitleStrategy, useClass: CustomTitleStrategy },
		importProvidersFrom([
			NgxWebstorageModule.forRoot({
				prefix: 'saude-app',
				separator: '-'
			})
		])
	]
};
