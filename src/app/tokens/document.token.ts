import { InjectionToken } from '@angular/core';

export const DOCUMENT = new InjectionToken<Document | null>('document.token', {
	providedIn: 'root',
	factory: (): Document | null => {
		if (typeof document !== 'undefined') {
			return document;
		}
		return null;
	}
});
