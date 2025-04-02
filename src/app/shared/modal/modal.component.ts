import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, signal, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IconComponent } from '../icon/icon.component';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [IconComponent, NgClass],
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
