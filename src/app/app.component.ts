import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LocaleService } from './services/locale/locale.service';
import { AlertComponent } from './components/alert/alert.component';

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
