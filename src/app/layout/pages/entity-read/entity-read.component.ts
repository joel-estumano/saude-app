import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ContainerBaseComponent } from 'src/app/components/container-base/container-base.component';

@Component({
	selector: 'app-entity-read',
	standalone: true,
	imports: [ContainerBaseComponent],
	templateUrl: './entity-read.component.html',
	styleUrl: './entity-read.component.scss'
})
export class EntityReadComponent {
	private _id!: string;

	@Input({ required: true })
	set id(id: string) {
		this.loadData(id);
	}

	private loadData(id: string): void {
		this._id = id;
	}

	constructor(
		private router: Router,
		private location: Location
	) {}

	back(): void {
		this.location.back();
	}

	edit(): void {
		this.router.navigate(['editar', this._id]);
	}
}
