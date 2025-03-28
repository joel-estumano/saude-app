import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormUtils } from 'src/app/utils';
import { MultiSelectorComponent } from '../multi-selector/multi-selector.component';
import { IEspecialidade, IRegional } from '@types';

/**
 * @description
 * Componente de formulário reutilizável para criar ou editar entidades.
 *
 * Este componente utiliza a nova abordagem de `input` e `output` no Angular 17,
 * que melhora a legibilidade e reduz a verbosidade da definição de propriedades.
 */
@Component({
	selector: 'app-entity-form',
	standalone: true, // Define este componente como standalone, ou seja, independente de um módulo compartilhado.
	imports: [FormsModule, ReactiveFormsModule, NgClass, NgxMaskDirective, MultiSelectorComponent], // Declara os módulos necessários.
	providers: [provideNgxMask()], // Provedor para funcionalidade de máscara nos inputs.
	templateUrl: './entity-form.component.html',
	styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent {
	/**
	 * @description
	 * Formulário de grupo reativo gerenciado pelo componente pai.
	 * A propriedade é obrigatória, e o `input.required` garantirá que um erro seja emitido
	 * em tempo de compilação caso ela não seja fornecida.
	 */
	entityForm = input.required<FormGroup>();

	/**
	 * @description
	 * Lista de regionais usada para preencher a lista de opções do select.
	 * É opcional, mas deve ser inicializada como um array vazio por padrão.
	 */
	regionais = input<IRegional[]>();

	/**
	 * @description
	 * Lista de especialidades usada para preencher a lista de opções do select.
	 * É opcional, mas deve ser inicializada como um array vazio por padrão.
	 */
	especialidades = input<IEspecialidade[]>();

	/**
	 * @description
	 * Indica o estado de carregamento para exibir mensagens ou bloquear interações.
	 * Propriedade opcional com valor padrão definido como `false`.
	 */
	isLoading = input<boolean>(false);

	/**
	 * @description
	 * Define se o formulário já foi submetido, útil para validações visuais
	 * no estilo de classes aplicadas dinamicamente.
	 * Propriedade opcional com valor padrão definido como `false`.
	 */
	isFormSubmited = input<boolean>(false);

	/**
	 * @description
	 * Evento emitido quando o formulário é submetido com sucesso.
	 * Deve ser tratado pelo componente pai.
	 */
	save = output<void>();

	/**
	 * @description
	 * Evento emitido quando o usuário cancela a ação.
	 * Deve ser tratado pelo componente pai.
	 */
	// eslint-disable-next-line @angular-eslint/no-output-native
	cancel = output<void>();

	// Utilitário de formulário reutilizável para validações e estilizações
	protected formUtils = FormUtils;

	/**
	 * @description
	 * Método chamado ao submeter o formulário. Emite o evento `save` para o componente pai.
	 */
	submit() {
		this.save.emit();
	}

	/**
	 * @description
	 * Método chamado ao cancelar a operação. Emite o evento `cancel` para o componente pai.
	 */
	cancelAction() {
		this.cancel.emit();
	}
}
