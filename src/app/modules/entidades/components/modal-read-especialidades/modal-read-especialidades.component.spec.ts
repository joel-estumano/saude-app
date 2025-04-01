import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalReadEspecialidadesComponent } from './modal-read-especialidades.component';
import { EntidadesModule } from '../../entidades.module';

describe('ModalReadEspecialidadesComponent', () => {
	let component: ModalReadEspecialidadesComponent;
	let fixture: ComponentFixture<ModalReadEspecialidadesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ModalReadEspecialidadesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
