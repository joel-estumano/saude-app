/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

describe('UserProfileComponent', () => {
	let component: UserProfileComponent;
	let fixture: ComponentFixture<UserProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserProfileComponent],
			providers: [AuthService, provideHttpClient(), provideHttpClientTesting(), { provide: Store, useValue: {} }, LocalStorageService]
		}).compileComponents();

		fixture = TestBed.createComponent(UserProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
 */
