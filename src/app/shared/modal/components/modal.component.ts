import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, signal, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-modal',

	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements AfterViewInit, OnDestroy {
	@ViewChild('modalContent', { read: ViewContainerRef }) container!: ViewContainerRef;
	isVisible = signal(false);
	private subscription!: Subscription;

	constructor(private modalService: ModalService) {}

	ngAfterViewInit(): void {
		this.subscription = this.modalService.modalContent$.subscribe((component) => {
			if (component) {
				this.isVisible.set(true);
				this.renderComponent(component);
			} else {
				this.isVisible.set(false);
				this.clearContainer();
			}
		});
	}

	private renderComponent<T>(component: Type<T>): void {
		this.container.clear(); // Limpa o container para renderizar o novo conteúdo
		const componentRef = this.container.createComponent(component); // Usa o componente diretamente
		this.modalService.setInstance(componentRef.instance); // Salva a instância do componente
	}

	private clearContainer(): void {
		if (this.container) {
			this.container.clear();
		}
	}

	close(): void {
		this.modalService.close();
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
