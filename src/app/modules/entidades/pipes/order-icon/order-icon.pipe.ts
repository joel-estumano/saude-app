import { Pipe, PipeTransform } from '@angular/core';
import { IconName } from 'src/app/shared/icon/icon.component';

@Pipe({
	name: 'orderIcon'
})
export class OrderIconPipe implements PipeTransform {
	transform(isActive: boolean, order: 'asc' | 'desc'): IconName {
		if (!isActive) {
			return 'heroChevronUpDown';
		}
		return order === 'asc' ? 'heroChevronUp' : 'heroChevronDown';
	}
}
