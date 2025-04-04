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
import { AlertModule } from './shared/alert/alert.module';
import { ProgressBarModule } from './shared/progress-bar/progress-bar.module';
import { ModalModule } from './shared/modal/modal.module';
import { userReducer } from './store/user/user.reducer';

// Registra os dados de localização para 'pt-BR'
registerLocaleData(ptBr);

// Configuração de rolagem em memória (scrolling)
const scrollConfig: InMemoryScrollingOptions = {
	scrollPositionRestoration: 'enabled', // Restaura a posição ao navegar para trás/avançar
	anchorScrolling: 'enabled' // Habilita âncora para rolagem
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
	providers: [
		// Otimização na detecção de alterações para reduzir eventos redundantes
		provideZoneChangeDetection({ eventCoalescing: true }),
		// Configuração das rotas da aplicação
		provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
		// Configuração do cliente HTTP com interceptadores e fetch
		provideHttpClient(withFetch(), withInterceptors(httpInterceptorProviders)),
		// Define o idioma padrão como 'pt-BR'
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		// Estratégia personalizada para gerenciamento de títulos de página
		{ provide: TitleStrategy, useClass: CustomTitleStrategy },
		// Importação e registro de módulos globais com `forRoot`
		importProvidersFrom([
			// Configuração global para AlertModule (módulo de alertas)
			AlertModule.forRoot(),
			// Configuração global para ProgressBarModule (barra de progresso)
			ProgressBarModule.forRoot(),
			// Configuração global para ModalModule (dialog - modal)
			ModalModule.forRoot(),
			// Configuração do armazenamento local com prefixo personalizado
			NgxWebstorageModule.forRoot({
				prefix: 'saude-app', // Prefixo para chaves de armazenamento
				separator: '-' // Separador entre prefixo e nome da chave
			})
		]),
		// Configuração do estado global com reducer do NgRx
		provideStore({
			entidades: entidadesReducer, // Reducer responsável pelo gerenciamento de entidades
			user: userReducer // Reducer responsável pelo gerenciamento de usuários
		}),
		// Configuração de efeitos NgRx para ações assíncronas
		provideEffects([
			EntidadesEffects // Efeitos relacionados à funcionalidade de entidades
		]),
		// Importação de módulos específicos da aplicação
		importProvidersFrom([
			EntidadesModule // Módulo para configurações locais de 'Entidades'
		])
	]
};
