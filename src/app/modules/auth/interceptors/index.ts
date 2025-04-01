import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';
import { progressInterceptor } from './progress.interceptor';

export const httpInterceptorProviders = [progressInterceptor, authInterceptor, errorInterceptor];
