import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBarModule } from '../progress-bar.module';

describe('ProgressBarComponent', () => {
	let component: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProgressBarModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ProgressBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
