import { AddComponent } from './views/add/add.component';
import { CommonModule, NgClass } from '@angular/common';
import { ContainerBaseComponent } from '../../shared/container-base/container-base.component';
import { EditComponent } from './views/edit/edit.component';
import { EntidadeFormComponent } from './components/entidade-form/entidade-form.component';
import { EntidadesService } from './services/entidades.service';
import { EspecialidadesModule } from '../especialidades/especialidades.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/icon/icon.component';
import { ListComponent } from './views/list/list.component';
import { ModalConfirmRemoveComponent } from './components/modal-confirm-remove/modal-confirm-remove.component';
import { ModalReadEspecialidadesComponent } from './components/modal-read-especialidades/modal-read-especialidades.component';
import { MultiSelectorComponent } from 'src/app/shared/multi-selector/multi-selector.component';
import { NgModule } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReadComponent } from './views/read/read.component';
import { RegionaisModule } from '../regionais/regionais.module';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from 'src/app/shared/selector/selector.component';
import { TextActionSubmitPipe } from './pipes/text-action-submit.pipe';

const routes: Routes = [
	{ path: 'list', component: ListComponent },
	{ path: 'adicionar', component: AddComponent, title: 'Adicionar' },
	{ path: 'editar/:id', component: EditComponent, title: 'Editar' },
	{ path: 'visualizar/:id', component: ReadComponent, title: 'Visualizar' },
	{ path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		ListComponent,
		AddComponent,
		EditComponent,
		ReadComponent,
		EntidadeFormComponent,
		TextActionSubmitPipe,
		ModalConfirmRemoveComponent,
		ModalReadEspecialidadesComponent
	],
	imports: [
		CommonModule,
		RegionaisModule,
		EspecialidadesModule,
		RouterModule.forChild(routes),
		ContainerBaseComponent,
		FormsModule,
		ReactiveFormsModule,
		NgClass,
		NgxMaskDirective,
		SelectorComponent,
		MultiSelectorComponent,
		IconComponent
	],
	providers: [EntidadesService, provideNgxMask()]
})
export class EntidadesModule {}
