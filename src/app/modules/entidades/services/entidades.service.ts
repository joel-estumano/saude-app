import { HttpService } from 'src/app/services/http/http.service';
import { EntidadeAddPayload, EntidadeData } from '@interfaces';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * Serviço para gerenciar operações relacionadas às Entidades.
 *
 */
@Injectable({
	providedIn: 'platform'
})
export class EntidadesService {
	/**
	 * Cria uma instância do EntidadesService.
	 *
	 * @param httpService - Serviço HTTP responsável por executar requisições HTTP.
	 */
	constructor(private httpService: HttpService) {}

	/**
	 * Adiciona uma nova entidade.
	 *
	 * Este método realiza uma requisição POST para o endpoint `entidades` da API, enviando os dados
	 * fornecidos pelo usuário no formato definido por `IEntityAddPayload`.
	 *
	 * @param data - Objeto contendo os dados da entidade a ser adicionada, conforme o tipo `IEntityAddPayload`.
	 * @returns Observable contendo a resposta da API com os dados da entidade adicionada.
	 */
	add(data: EntidadeAddPayload): Observable<EntidadeData> {
		return this.httpService.post<EntidadeAddPayload, { data: EntidadeData }>('entidades', data).pipe(map((res) => res.data));
	}

	/**
	 * Obtém os dados de uma entidade específica.
	 *
	 * Este método realiza uma requisição GET para o endpoint `entidades/{uuid}` da API.
	 * Retorna os dados detalhados da entidade com o identificador fornecido.
	 *
	 * @param uuid - Identificador único da entidade (UUID).
	 * @returns Observable contendo os dados da entidade no formato `EntidadeData`.
	 */
	read(uuid: string): Observable<EntidadeData> {
		return this.httpService.get<{ data: EntidadeData }>(`entidades/${uuid}`).pipe(map((res) => res.data));
	}

	/**
	 * Edita os dados de uma entidade existente.
	 *
	 * Este método realiza uma requisição PUT para o endpoint `entidades/{uuid}` da API,
	 * enviando os dados atualizados para a entidade com o identificador fornecido.
	 *
	 * @param uuid - Identificador único da entidade (UUID).
	 * @param data - Objeto contendo os dados atualizados da entidade, conforme o tipo `EntidadeAddPayload`.
	 * @returns Observable contendo os dados da entidade atualizada no formato `EntidadeData`.
	 */
	edit(uuid: string, data: EntidadeAddPayload): Observable<EntidadeData> {
		return this.httpService.put<EntidadeAddPayload, { data: EntidadeData }>(`entidades/${uuid}`, data).pipe(map((res) => res.data));
	}

	/**
	 * Remove uma entidade existente.
	 *
	 * Este método realiza uma requisição DELETE para o endpoint `entidades/{uuid}` da API,
	 * deletando a entidade com o identificador fornecido.
	 *
	 * @param uuid - Identificador único da entidade (UUID).
	 * @returns Observable contendo a resposta da remoção.
	 */
	remove(uuid: string): Observable<void> {
		return this.httpService.delete<void>(`entidades/${uuid}`).pipe(map(() => undefined)); // Retorna um Observable vazio
	}

	list(): Observable<{ data: { data: EntidadeData[] } }> {
		return this.httpService.get('entidades');
	}
}
