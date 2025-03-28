import { Component, forwardRef, HostListener, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-multi-selector',
	standalone: true,
	imports: [],
	templateUrl: './multi-selector.component.html',
	styleUrl: './multi-selector.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultiSelectorComponent),
			multi: true
		}
	]
})
export class MultiSelectorComponent<T, K extends keyof T> implements ControlValueAccessor {
	/**
	 * @description
	 * Lista de itens que serão exibidos no seletor.
	 * O tipo de cada item pode ser parametrizado com `T`.
	 */
	items = input<T[]>();

	/**
	 * @description
	 * Chave que define o label:
	 * - Exemplo: 'label', ou outra propriedade do tipo `T`.
	 * - Valor padrão: 'label'.
	 */
	label = input<K>('label' as K);

	/**
	 * @description
	 * Chave que define como os dados selecionados serão enviados para o controle pai:
	 * - Exemplo: 'uuid', 'label', ou outra propriedade do tipo `T`.
	 * - Valor padrão: 'uuid'.
	 */
	selectionKey = input<K>('uuid' as K); // Define a chave para recuperar os valores

	/**
	 * Lista interna que mantém os itens selecionados.
	 */
	protected selectedItems: T[] = [];

	// Funções do ControlValueAccessor
	private onChange: (value: T[keyof T][]) => void = () => {
		console.log('...');
	};
	private onTouched: () => void = () => {
		console.log('...');
	};

	/**
	 * Atualiza o estado de seleção/desseleção de um item.
	 * Emite os dados para o controle pai de acordo com a chave definida em `selectionKey`.
	 */
	toggleSelection(item: T) {
		const value = item[this.selectionKey()];
		const index = this.selectedItems.findIndex((i: T) => i[this.selectionKey()] === value);

		if (index > -1) {
			this.selectedItems.splice(index, 1); // Remove da lista
		} else {
			this.selectedItems.push(item); // Adiciona à lista
		}

		this.emitSelection();
	}

	/**
	 * Retorna o estado de seleção de um item específico.
	 */
	checkedValues(item: T) {
		return this.selectedItems.some((i) => i[this.selectionKey()] === item[this.selectionKey()]);
	}

	/**
	 * Emite os valores selecionados para o FormControl.
	 * Caso uma chave específica seja definida, envia apenas os valores dessa chave.
	 */
	private emitSelection() {
		this.onChange(this.selectedItems.map((item) => item[this.selectionKey()]));
	}

	// Métodos do ControlValueAccessor:
	writeValue(value: T[keyof T][]): void {
		if (Array.isArray(value)) {
			this.selectedItems = this.items()?.filter((item: T) => value.includes(item[this.selectionKey()])) || [];
		}
	}

	registerOnChange(fn: (value: T[keyof T][]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	isOpen = signal<boolean>(false); // Estado do dropdown (aberto ou fechado)

	/**
	 * Abre ou fecha o menu dropdown.
	 */
	toggleMenu() {
		this.isOpen.set(!this.isOpen());
	}

	/**
	 * Obtém o rótulo exibido no botão principal.
	 */
	getSelectedLabel(): string {
		if (!this.selectedItems.length) return '';
		return this.selectedItems.map((item) => item[this.label()]).join(', ');
	}

	/**
	 * Fecha o dropdown ao clicar fora dele.
	 */
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent) {
		const target = event.target as HTMLElement;

		if (!target.closest('.multi-selector')) {
			this.isOpen.set(false); // Fecha o dropdown
		}
	}
}
