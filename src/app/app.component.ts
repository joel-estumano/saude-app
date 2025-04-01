import { AlertComponent } from './shared/alert/alert.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocaleService } from './services/locale/locale.service';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, AlertComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private localeService: LocaleService) {
		this.localeService.setLocale('pt-BR');
	}
}
