import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { AlertService } from './services/alert.service';
import { IconComponent } from 'src/app/shared/icon/icon.component';
import { AlertComponent } from './components/alert.component';

@NgModule({
	declarations: [AlertComponent],
	imports: [CommonModule, NgClass, IconComponent],
	exports: [AlertComponent]
})
export class AlertModule {
	static forRoot(): ModuleWithProviders<AlertModule> {
		return {
			ngModule: AlertModule,
			providers: [AlertService]
		};
	}
}
