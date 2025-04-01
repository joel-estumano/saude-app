import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';

@Component({
	selector: 'app-progress-bar',
	standalone: true,
	imports: [AsyncPipe],
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
	progress$ = this.progressService.progress$;

	constructor(private progressService: ProgressBarService) {}
}
