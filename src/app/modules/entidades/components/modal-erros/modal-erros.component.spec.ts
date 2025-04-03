import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalErrosComponent } from './modal-erros.component';
import { EntidadesModule } from '../../entidades.module';

describe('ModalErrosComponent', () => {
	let component: ModalErrosComponent;
	let fixture: ComponentFixture<ModalErrosComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ModalErrosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
