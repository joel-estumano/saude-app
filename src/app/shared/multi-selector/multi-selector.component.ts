import { ChangeDetectionStrategy, Component, computed, forwardRef, HostListener, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/**
 * Componente MultiSelector:
 * Um componente que permite a seleção de múltiplos itens de uma lista.
 * Implementa a interface ControlValueAccessor para integração com formulários do Angular.
 */
@Component({
	selector: 'app-multi-selector', // Nome do seletor usado no HTML
	standalone: true, // Permite o uso independente deste componente
	imports: [NgClass, IconComponent], // Importação de dependências e componentes adicionais
	templateUrl: './multi-selector.component.html', // Template HTML
	styleUrls: ['./multi-selector.component.scss'], // Estilos do componente
	providers: [
		{
			provide: NG_VALUE_ACCESSOR, // Define este componente como ControlValueAccessor
			useExisting: forwardRef(() => MultiSelectorComponent), // Referência ao próprio componente
			multi: true // Permite múltiplos provedores
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectorComponent<T, K extends keyof T> implements ControlValueAccessor {
	/**
	 * Lista de itens para seleção. Deve ser fornecida como entrada.
	 */
	items = input<T[]>();

	/**
	 * Nome da propriedade usada como rótulo de cada item.
	 * Por exemplo: 'name', 'title'.
	 */
	label = input<K>('label' as K);

	/**
	 * Indica se o item está desabilitado.
	 * Aceita um valor booleano. O padrão é `false`.
	 */
	isLoading = input<boolean>(false);

	/**
	 * Classes CSS dinâmicas para estilização. Passadas como entrada.
	 */
	ngClass = input<Record<string, boolean>>();

	/**
	 * Propriedade usada como identificador único dos itens (chave para seleção).
	 * Por exemplo: 'id', 'uuid'.
	 */
	selectionKey = input<K>('uuid' as K);

	/**
	 * Lista de itens atualmente selecionados.
	 * Reativo com o uso de sinal.
	 */
	protected selectedItems = signal<T[]>([]);

	/**
	 * Função chamada quando o valor selecionado muda.
	 * Configurada pela interface ControlValueAccessor.
	 */
	/* eslint-disable @typescript-eslint/no-empty-function */
	private onChange: (value: T[keyof T][]) => void = () => {};

	/**
	 * Função chamada quando o campo é tocado pelo usuário.
	 * Configurada pela interface ControlValueAccessor.
	 */
	/* eslint-disable @typescript-eslint/no-empty-function */
	private onTouched: () => void = () => {};

	/**
	 * Alterna a seleção de um item, adicionando ou removendo-o da lista de selecionados.
	 * @param item O item a ser alternado.
	 */
	toggleSelection(item: T): void {
		const value = item[this.selectionKey()];
		const index = this.selectedItems().findIndex((i: T) => i[this.selectionKey()] === value);

		if (index > -1) {
			// Se o item já estiver selecionado, remove-o.
			const updated = [...this.selectedItems()];
			updated.splice(index, 1);
			this.selectedItems.set(updated);
		} else {
			// Se o item não estiver selecionado, adiciona-o.
			this.selectedItems.set([...this.selectedItems(), item]);
		}

		this.emitSelection(); // Emite o valor atualizado
	}

	/**
	 * Computação que verifica se um item está selecionado.
	 * Retorna uma função que pode ser usada no template.
	 */
	checkedValues = computed(() => {
		return (item: T) => this.selectedItems().some((i) => i[this.selectionKey()] === item[this.selectionKey()]);
	});

	/**
	 * Emite os valores selecionados para o Angular Forms.
	 */
	private emitSelection(): void {
		this.onChange(this.selectedItems().map((item) => item[this.selectionKey()]));
	}

	/**
	 * Recebe o valor inicial para o campo de formulário do Angular.
	 * @param value Valores fornecidos pelo Angular Forms.
	 */
	writeValue(value: T[keyof T][]): void {
		if (Array.isArray(value)) {
			// Filtra e ajusta os itens selecionados com base nos valores recebidos.
			this.selectedItems.set(this.items()?.filter((item: T) => value.includes(item[this.selectionKey()])) || []);
		} else {
			this.selectedItems.set([]); // Redefine a lista de selecionados.
		}
	}

	/**
	 * Registra uma função a ser chamada ao alterar os valores selecionados.
	 * @param fn Função fornecida pelo Angular Forms.
	 */
	registerOnChange(fn: (value: T[keyof T][]) => void): void {
		this.onChange = fn;
	}

	/**
	 * Registra uma função a ser chamada ao tocar no campo.
	 * @param fn Função fornecida pelo Angular Forms.
	 */
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Estado que determina se o menu dropdown está aberto.
	 */
	isOpen = signal<boolean>(false);

	/**
	 * Alterna o estado de abertura do menu dropdown.
	 */
	toggleMenu(): void {
		this.isOpen.set(!this.isOpen());
	}

	/**
	 * Computação para exibir os rótulos dos itens selecionados como texto.
	 * Concatena os rótulos dos itens separados por vírgula.
	 */
	getSelectedLabel = computed(() => {
		if (!this.selectedItems().length) {
			return ''; // Retorna vazio se não houver itens selecionados
		}

		// Concatena os rótulos dos itens selecionados
		return this.selectedItems()
			.map((item) => item[this.label()])
			.join(', ');
	});

	/**
	 * Fecha o menu dropdown ao clicar fora do componente.
	 * @param event Evento de clique no documento.
	 */
	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;

		if (!target.closest('.multi-selector')) {
			this.isOpen.set(false);
		}
	}
}
