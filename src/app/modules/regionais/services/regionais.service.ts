import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { IRegionalData } from '@interfaces';
import { map, Observable } from 'rxjs';

/**
 * Serviço para gerenciar operações relacionadas às Regionais.
 *
 * Este serviço fornece um método para listar as regionais consumindo o endpoint `regionais`
 * da API, retornando os dados no formato esperado.
 */
@Injectable({
	providedIn: 'platform'
})
export class RegionaisService {
	/**
	 * Cria uma instância do RegionaisService.
	 *
	 * @param httpService - Serviço HTTP responsável por executar requisições HTTP.
	 */
	constructor(private httpService: HttpService) {}

	/**
	 * Obtém a lista de Regionais.
	 *
	 * Este método realiza uma requisição GET para o endpoint `regionais` da API e mapeia a
	 * resposta para retornar apenas os dados relevantes (uma lista de objetos do tipo `IRegional`).
	 *
	 * @returns Observable contendo um array de objetos do tipo `IRegional`.
	 */
	list(): Observable<IRegionalData[]> {
		return this.httpService.get<{ data: IRegionalData[] }>('regionais').pipe(map((res) => res.data));
	}
}
