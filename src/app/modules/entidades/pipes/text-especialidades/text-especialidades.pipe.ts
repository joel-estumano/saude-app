import { Pipe, PipeTransform } from '@angular/core';
import { IEspecialidadeData } from '@interfaces';

@Pipe({
	name: 'textEspecialidades'
})
export class TextEspecialidadesPipe implements PipeTransform {
	transform(value: IEspecialidadeData[]): string {
		return value && value.length ? `${value.map((v) => v.label).join(', ')}.` : '';
	}
}
