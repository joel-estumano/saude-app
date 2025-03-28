import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { IEntityAddPayload } from '@types';

@Injectable({
	providedIn: 'root'
})
export class EntityService {
	constructor(private httpService: HttpService) {}

	add(data: IEntityAddPayload): Observable<IEntityAddPayload> {
		return this.httpService.post<IEntityAddPayload, IEntityAddPayload>('entidades', data);
	}
}
