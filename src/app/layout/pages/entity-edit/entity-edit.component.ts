import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';

@Component({
	selector: 'app-entity-edit',
	standalone: true,
	imports: [ContainerBaseComponent],
	templateUrl: './entity-edit.component.html',
	styleUrl: './entity-edit.component.scss'
})
export class EntityEditComponent {
	@Input({ required: true })
	set id(id: string) {
		this.loadData(id);
	}

	private loadData(id: string): void {
		console.log('id: ', id);
	}

	constructor(private router: Router) {}

	remove(): void {
		console.log('...');
	}

	cancel(): void {
		this.router.navigate(['/']);
	}

	edit(): void {
		console.log('...');
	}
}
