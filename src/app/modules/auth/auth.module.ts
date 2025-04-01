import { AuthService } from './services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ContainerBaseComponent } from 'src/app/shared/container-base/container-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ContainerBaseComponent, FormsModule, ReactiveFormsModule, NgClass],
	providers: [AuthService]
})
export class AuthModule {}
