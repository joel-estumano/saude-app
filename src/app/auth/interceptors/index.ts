import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';

export const httpInterceptorProviders = [authInterceptor, errorInterceptor];
