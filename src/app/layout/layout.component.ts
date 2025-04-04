import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { LocalStorageService } from 'ngx-webstorage';
import { Store } from '@ngrx/store';
import { IUser } from '@interfaces';
import { setUser } from '../store/user/user.actions';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, ProgressBarModule, UserProfileComponent],
	templateUrl: './layout.component.html'
})
export class LayoutComponent {
	constructor(
		private localSt: LocalStorageService,
		private store: Store<{ user: IUser }>
	) {
		const user = this.localSt.retrieve('user');
		this.store.dispatch(setUser({ user: user ? user : null }));
	}
}
