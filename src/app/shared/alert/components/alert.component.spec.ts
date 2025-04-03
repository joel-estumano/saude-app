import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { AlertModule } from '../alert.module';

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AlertModule]
		}).compileComponents();

		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
