import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as heroiconsRegular from '@ng-icons/heroicons/outline';
import * as heroiconsSolid from '@ng-icons/heroicons/solid';

export type IconName = keyof typeof heroiconsRegular | keyof typeof heroiconsSolid;

const mergeIcons = {
	...heroiconsRegular,
	...heroiconsSolid
};

@Component({
	selector: 'app-icon',
	standalone: true,
	imports: [NgIconComponent],
	providers: [provideIcons(mergeIcons)],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
	icon = input<IconName>();
	name = computed(() => this.icon() as IconName);
}
