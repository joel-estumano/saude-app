import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadeFormComponent } from './entidade-form.component';
import { EntidadesModule } from '../../entidades.module';
import { RegionaisService } from 'src/app/modules/regionais/services/regionais.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

describe('EntidadeFormComponent', () => {
	let component: EntidadeFormComponent;
	let fixture: ComponentFixture<EntidadeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule],
			providers: [RegionaisService, provideHttpClient(), provideHttpClientTesting(), { provide: Store, useValue: {} }]
		}).compileComponents();

		fixture = TestBed.createComponent(EntidadeFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
