import { AuthService } from './services/auth.service';
import { NgClass } from '@angular/common';
import { ContainerBaseComponent } from 'src/app/shared/container-base/container-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/icon/icon.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from '../../shared/progress-bar/progress-bar.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: LoginComponent, title: '' },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	declarations: [LoginComponent],
	imports: [RouterModule.forChild(routes), ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass, IconComponent, ProgressBarModule],
	providers: [AuthService]
})
export class AuthModule {}
