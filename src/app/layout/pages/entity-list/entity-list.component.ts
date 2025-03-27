import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerBaseComponent } from '../../../components/container-base/container-base.component';

@Component({
	selector: 'app-entity-list',
	standalone: true,
	imports: [ContainerBaseComponent],
	templateUrl: './entity-list.component.html',
	styleUrl: './entity-list.component.scss'
})
export class EntityListComponent {
	constructor(private router: Router) {}

	add(): void {
		this.router.navigate(['adicionar']);
	}

	read(id: string): void {
		this.router.navigate(['visualizar', id]);
	}

	edit(id: string): void {
		this.router.navigate(['editar', id]);
	}

	protected _invoices = [
		{
			invoice: 'INV001',
			paymentStatus: 'Paid',
			totalAmount: '$250.00',
			paymentMethod: 'Credit Card'
		},
		{
			invoice: 'INV002',
			paymentStatus: 'Pending',
			totalAmount: '$150.00',
			paymentMethod: 'PayPal'
		},
		{
			invoice: 'INV003',
			paymentStatus: 'Unpaid',
			totalAmount: '$350.00',
			paymentMethod: 'Bank Transfer'
		},
		{
			invoice: 'INV004',
			paymentStatus: 'Paid',
			totalAmount: '$450.00',
			paymentMethod: 'Credit Card'
		},
		{
			invoice: 'INV005',
			paymentStatus: 'Paid',
			totalAmount: '$550.00',
			paymentMethod: 'PayPal'
		},
		{
			invoice: 'INV006',
			paymentStatus: 'Pending',
			totalAmount: '$200.00',
			paymentMethod: 'Bank Transfer'
		},
		{
			invoice: 'INV007',
			paymentStatus: 'Unpaid',
			totalAmount: '$300.00',
			paymentMethod: 'Credit Card'
		}
	];
}
