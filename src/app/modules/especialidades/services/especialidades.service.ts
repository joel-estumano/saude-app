import { HttpService } from 'src/app/services/http/http.service';
import { IEspecialidadeData } from '@interfaces';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * Serviço para gerenciar operações relacionadas às Especialidades.
 *
 * Este serviço fornece um método para listar as especialidades consumindo o endpoint `especialidades`
 * da API, retornando os dados no formato esperado.
 */
@Injectable({
	providedIn: 'platform'
})
export class EspecialidadesService {
	/**
	 * Cria uma instância do EspecialidadesService.
	 *
	 * @param httpService - Serviço HTTP responsável por executar requisições HTTP.
	 */
	constructor(private httpService: HttpService) {}

	/**
	 * Obtém a lista de Especialidades.
	 *
	 * Este método realiza uma requisição GET para o endpoint `especialidades` da API e mapeia a
	 * resposta para retornar apenas os dados relevantes (uma lista de objetos do tipo `IEspecialidade`).
	 *
	 * @returns Observable contendo um array de objetos do tipo `IEspecialidade`.
	 */
	list(): Observable<IEspecialidadeData[]> {
		return this.httpService.get<{ data: IEspecialidadeData[] }>('especialidades').pipe(map((res) => res.data));
	}
}
