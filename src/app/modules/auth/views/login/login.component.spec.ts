import { AuthModule } from '../../auth.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/services/http/http.service';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AuthModule],
			providers: [HttpService, LocalStorageService, provideHttpClient(), provideHttpClientTesting(), { provide: Store, useValue: {} }]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
