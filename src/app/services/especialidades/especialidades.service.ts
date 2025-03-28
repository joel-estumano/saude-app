import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map, Observable } from 'rxjs';
import { IEspecialidade } from '@types';

@Injectable({
	providedIn: 'root'
})
export class EspecialidadesService {
	constructor(private httpService: HttpService) {}

	list(): Observable<IEspecialidade[]> {
		return this.httpService.get<{ data: IEspecialidade[] }>('especialidades').pipe(map((res) => res.data));
	}
}
