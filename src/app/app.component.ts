import { AlertModule } from './shared/alert/alert.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocaleService } from './services/locale/locale.service';
import { ModalModule } from './shared/modal/modal.module';
import { ProgressBarModule } from './shared/progress-bar/progress-bar.module';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, AlertModule, ProgressBarModule, ModalModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private localeService: LocaleService) {
		this.localeService.setLocale('pt-BR');
	}
}
