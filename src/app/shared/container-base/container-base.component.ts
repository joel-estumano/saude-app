import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-container-base',
	standalone: true,
	imports: [NgClass],
	templateUrl: './container-base.component.html',
	styleUrl: './container-base.component.scss'
})
export class ContainerBaseComponent {
	/**
	 * Define se o componente será exibido em largura total "full" ou não.
	 * Valor padrão: false.
	 */
	full = input<boolean>(false);

	/**
	 * Classe CSS personalizada aplicada ao componente.
	 * Valor padrão: string vazia ('').
	 */
	class = input<string>('');
}
