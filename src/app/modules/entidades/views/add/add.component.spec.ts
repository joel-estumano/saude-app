import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EntidadesService } from '../../services/entidades.service';
import { EntidadesModule } from '../../entidades.module';

describe('AddComponent', () => {
	let component: AddComponent;
	let fixture: ComponentFixture<AddComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule],
			providers: [EntidadesService, provideHttpClient(), provideHttpClientTesting()]
		}).compileComponents();

		fixture = TestBed.createComponent(AddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
