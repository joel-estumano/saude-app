import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityAddComponent } from './entity-add.component';
import { RegionaisService } from 'src/app/services/regionais/regionais.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EntityAddComponent', () => {
	let component: EntityAddComponent;
	let fixture: ComponentFixture<EntityAddComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EntityAddComponent],
			providers: [RegionaisService, provideHttpClient(), provideHttpClientTesting()]
		}).compileComponents();

		fixture = TestBed.createComponent(EntityAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
