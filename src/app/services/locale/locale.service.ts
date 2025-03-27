import { Inject, Injectable, LOCALE_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@tokens/document.token';

@Injectable({
	providedIn: 'root'
})
export class LocaleService {
	private renderer: Renderer2;

	constructor(
		@Inject(LOCALE_ID) private localeId: string,
		@Inject(DOCUMENT) private document: Document,
		rendererFactory: RendererFactory2
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	setLocale(locale: string): void {
		this.localeId = locale;
		if (this.document) {
			this.renderer.setAttribute(this.document.documentElement, 'lang', locale);
		}
	}
}
