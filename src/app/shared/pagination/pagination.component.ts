import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-pagination',
	standalone: true,
	imports: [NgClass, IconComponent],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
	currentPage = input<number>(1);
	totalPages = input<number>(1);
	pageChanged = output<number>();

	/**
	 * Gera uma lista de páginas visíveis ao redor da página atual.
	 * Adiciona "..." para representar intervalos grandes.
	 */
	get visiblePages(): (number | string)[] {
		const maxVisibleButtons = 5; // Número máximo de botões exibidos (incluindo ...)
		const pages: (number | string)[] = [];

		if (this.totalPages() <= maxVisibleButtons) {
			// Mostra todas as páginas se o total for menor que o limite
			for (let i = 1; i <= this.totalPages(); i++) {
				pages.push(i);
			}
		} else {
			// Sempre mostra a primeira página
			pages.push(1);

			if (this.currentPage() > 3) {
				pages.push('...'); // Páginas antes do intervalo visível
			}

			// Páginas centrais em torno da página atual
			const start = Math.max(2, this.currentPage() - 1);
			const end = Math.min(this.totalPages() - 1, this.currentPage() + 1);
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (this.currentPage() < this.totalPages() - 2) {
				pages.push('...'); // Páginas após o intervalo visível
			}

			// Sempre mostra a última página
			pages.push(this.totalPages());
		}

		return pages;
	}

	handlerClick(page: string | number) {
		if (page.toString() !== '...') {
			this.goToPage(page as number);
		}
	}

	/**
	 * Navega para a página especificada.
	 * @param page Número da página para navegar
	 */
	goToPage(page: number): void {
		if (page >= 1 && page <= this.totalPages()) {
			this.pageChanged.emit(page); // Emite o evento para o componente pai
		}
	}
}
