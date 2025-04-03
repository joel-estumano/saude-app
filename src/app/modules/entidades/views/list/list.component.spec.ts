/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EntidadesService } from '../../services/entidades.service';
import { EntidadesModule } from '../../entidades.module';
import { Store } from '@ngrx/store';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntidadesModule],
			providers: [EntidadesService, provideHttpClient(), provideHttpClientTesting(), { provide: Store, useValue: {} }]
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
 */
