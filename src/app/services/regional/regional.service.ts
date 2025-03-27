import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { IRegional } from '@types';

@Injectable({
	providedIn: 'root'
})
export class RegionalService {
	constructor(private httpService: HttpService) {}

	list(): Observable<IRegional[]> {
		return this.httpService.get<IRegional[]>('regionais');
	}
}
