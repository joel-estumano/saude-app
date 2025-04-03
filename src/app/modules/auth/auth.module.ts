import { AuthService } from './services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ContainerBaseComponent } from 'src/app/shared/container-base/container-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { ProgressBarModule } from '../../shared/progress-bar/progress-bar.module';

const routes: Routes = [
	{ path: '', component: LoginComponent, title: '' },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass, IconComponent, ProgressBarModule],
	providers: [AuthService]
})
export class AuthModule {}
