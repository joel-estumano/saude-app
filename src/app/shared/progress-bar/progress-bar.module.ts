import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProgressBarComponent } from './components/progress-bar.component';
import { ProgressBarService } from './services/progress-bar.service';

@NgModule({
	declarations: [ProgressBarComponent],
	imports: [AsyncPipe],

	exports: [ProgressBarComponent]
})
export class ProgressBarModule {
	static forRoot(): ModuleWithProviders<ProgressBarModule> {
		return {
			ngModule: ProgressBarModule,
			providers: [ProgressBarService]
		};
	}
}
