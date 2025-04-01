import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerBaseComponent } from './container-base.component';

describe('ContainerBaseComponent', () => {
	let component: ContainerBaseComponent;
	let fixture: ComponentFixture<ContainerBaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContainerBaseComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ContainerBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
