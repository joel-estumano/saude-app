import { ChangeDetectionStrategy, Component, computed, forwardRef, HostListener, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/**
 * Componente Selector:
 * Um componente genérico para selecionar um item a partir de uma lista fornecida.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 */
@Component({
	selector: 'app-selector', // Nome do seletor usado no HTML
	standalone: true, // Este componente pode ser usado de forma independente
	imports: [NgClass, IconComponent], // Importação de módulos e componentes necessários
	templateUrl: './selector.component.html', // Caminho para o template HTML
	styleUrls: ['./selector.component.scss'], // Caminho para os estilos do componente
	providers: [
		{
			provide: NG_VALUE_ACCESSOR, // Define este componente como um ControlValueAccessor
			useExisting: forwardRef(() => SelectorComponent), // Referência ao próprio componente
			multi: true // Permite múltiplos provedores
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent<T, K extends keyof T> implements ControlValueAccessor {
	/**
	 * Lista de itens disponíveis para seleção.
	 * Deve ser fornecida como entrada.
	 */
	items = input<T[]>();

	/**
	 * Nome da propriedade usada para exibir o rótulo de cada item.
	 * Exemplo: 'nome', 'descricao'.
	 */
	label = input<K>('label' as K);

	/**
	 * Indica se o item está desabilitado.
	 * Aceita um valor booleano. O padrão é `false`.
	 */
	isLoading = input<boolean>(false);

	/**
	 * Classe CSS dinâmica para estilização.
	 * Deve ser fornecida como entrada.
	 */
	ngClass = input<Record<string, boolean>>();

	/**
	 * Propriedade usada como chave de seleção única dos itens.
	 * Exemplo: 'id', 'uuid'.
	 */
	selectionKey = input<K>('uuid' as K);

	/**
	 * Armazena o item selecionado atualmente.
	 * Utiliza o sinal para reatividade.
	 */
	protected selectedItem = signal<T | null>(null);

	/**
	 * Função chamada ao alterar o valor selecionado.
	 * Configurada pela interface ControlValueAccessor.
	 */
	/* eslint-disable @typescript-eslint/no-empty-function */
	private onChange: (value: T[keyof T] | null) => void = () => {};

	/**
	 * Função chamada ao tocar no campo do formulário.
	 * Configurada pela interface ControlValueAccessor.
	 */
	/* eslint-disable @typescript-eslint/no-empty-function */
	private onTouched: () => void = () => {};

	/**
	 * Alterna a seleção de um item. Atualiza o estado interno e emite o valor selecionado.
	 * @param item Item que será selecionado.
	 */
	toggleSelection(item: T): void {
		this.selectedItem.set(item);
		this.emitSelection();
		this.isOpen.set(false); // Fecha o menu após a seleção
	}

	/**
	 * Computação que verifica se um item está selecionado.
	 * @returns Função que verifica se o item está selecionado.
	 */
	checkedValues = computed(() => {
		return (item: T) => this.selectedItem() && this.selectedItem()?.[this.selectionKey()] === item[this.selectionKey()];
	});

	/**
	 * Emite o valor atual do item selecionado para o Angular Forms.
	 */
	private emitSelection(): void {
		const selectedValue = this.selectedItem()?.[this.selectionKey()];
		if (selectedValue !== undefined && selectedValue !== null) {
			this.onChange(selectedValue as T[keyof T]);
		}
	}

	/**
	 * Escreve o valor inicial do campo de formulário no componente.
	 * @param value Valor fornecido pelo Angular Forms.
	 */
	writeValue(value: T[keyof T]): void {
		if (value) {
			this.selectedItem.set(this.items()?.find((item: T) => item[this.selectionKey()] === value) || null);
		} else {
			this.selectedItem.set(null);
		}
	}

	/**
	 * Registra a função para ser chamada ao alterar o valor.
	 * @param fn Função fornecida pelo Angular Forms.
	 */
	registerOnChange(fn: (value: T[keyof T] | null) => void): void {
		this.onChange = fn;
	}

	/**
	 * Registra a função para ser chamada ao tocar no campo.
	 * @param fn Função fornecida pelo Angular Forms.
	 */
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Estado de abertura do menu dropdown.
	 */
	isOpen = signal<boolean>(false);

	/**
	 * Alterna o estado de abertura do menu dropdown.
	 */
	toggleMenu(): void {
		this.isOpen.set(!this.isOpen());
	}

	/**
	 * Computação para obter o rótulo do item atualmente selecionado.
	 * @returns Texto do rótulo do item selecionado ou vazio.
	 */
	getSelectedLabel = computed(() => {
		if (!this.selectedItem()) return '';
		return this.selectedItem()?.[this.label()] || '';
	});

	/**
	 * Fecha o menu dropdown ao clicar fora do componente.
	 * @param event Evento de clique no documento.
	 */
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.closest('.selector')) {
			this.isOpen.set(false);
		}
	}

	/**
	 * Trata eventos de teclado para alternar a seleção de itens.
	 * @param event Evento de teclado.
	 * @param item Item associado ao evento.
	 */
	handleKeydown(event: KeyboardEvent, item: T): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this.toggleSelection(item);
		}
	}
}
