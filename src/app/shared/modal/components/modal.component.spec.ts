import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalModule } from '../modal.module';

describe('ModalComponent', () => {
	let component: ModalComponent;
	let fixture: ComponentFixture<ModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
