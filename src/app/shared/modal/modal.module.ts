import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from './components/modal.component';
import { NgClass } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalService } from './services/modal.service';

@NgModule({
	declarations: [ModalComponent],
	imports: [IconComponent, NgClass],
	exports: [ModalComponent]
})
export class ModalModule {
	static forRoot(): ModuleWithProviders<ModalModule> {
		return {
			ngModule: ModalModule,
			providers: [ModalService]
		};
	}
}
