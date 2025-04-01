import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadComponent } from './read.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EntidadesService } from '../../services/entidades.service';
import { EntidadesModule } from '../../entidades.module';

describe('ReadComponent', () => {
	let component: ReadComponent;
	let fixture: ComponentFixture<ReadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule],
			providers: [EntidadesService, provideHttpClient(), provideHttpClientTesting()]
		}).compileComponents();

		fixture = TestBed.createComponent(ReadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
