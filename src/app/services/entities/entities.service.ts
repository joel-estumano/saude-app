import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class EntitiesService {
	constructor(private httpService: HttpService) {}
}
