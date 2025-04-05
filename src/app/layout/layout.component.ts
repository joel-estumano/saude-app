import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, ProgressBarModule, UserProfileComponent],
	templateUrl: './layout.component.html'
})
export class LayoutComponent {}
