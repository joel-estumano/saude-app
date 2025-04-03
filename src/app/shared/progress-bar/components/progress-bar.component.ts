import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
	selector: 'app-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
	progress$ = this.progressService.progress$;

	constructor(private progressService: ProgressBarService) {}
}
