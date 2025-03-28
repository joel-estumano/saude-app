import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map, Observable } from 'rxjs';
import { IRegional } from '@types';

@Injectable({
	providedIn: 'root'
})
export class RegionaisService {
	constructor(private httpService: HttpService) {}

	list(): Observable<IRegional[]> {
		return this.httpService.get<{ data: IRegional[] }>('regionais').pipe(map((res) => res.data));
	}
}
