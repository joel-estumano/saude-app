import { HttpService } from 'src/app/services/http/http.service';
import { IEntidadeAddPayload, IEntidadeData, IEntidadesPaginationData, IEntidadesPaginationFilters } from '@interfaces';
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
	add(data: IEntidadeAddPayload): Observable<IEntidadeData> {
		return this.httpService.post<IEntidadeAddPayload, { data: IEntidadeData }>('entidades', data).pipe(map((res) => res.data));
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
	read(uuid: string): Observable<IEntidadeData> {
		return this.httpService.get<{ data: IEntidadeData }>(`entidades/${uuid}`).pipe(map((res) => res.data));
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
	edit(uuid: string, data: IEntidadeAddPayload): Observable<IEntidadeData> {
		return this.httpService.put<IEntidadeAddPayload, { data: IEntidadeData }>(`entidades/${uuid}`, data).pipe(map((res) => res.data));
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

	/**
	 * Realiza uma requisição HTTP GET para obter uma lista paginada de entidades.
	 * @param filters - Objeto contendo os seguintes filtros:
	 *   - page (number): Número da página a ser retornada.
	 *   - per_page (number): Quantidade de itens por página.
	 *   - text (string): Texto para busca nas entidades.
	 *   - sort_field (string | undefined): Campo a ser utilizado na ordenação (opcional).
	 *   - sort_order ('asc' | 'desc' | undefined): Ordem de ordenação, sendo ascendente ('asc') ou descendente ('desc') (opcional).
	 * @returns Observable<IEntidadesPaginationData> - Fluxo assíncrono contendo os dados paginados das entidades no formato esperado.
	 */
	list(filters: IEntidadesPaginationFilters): Observable<IEntidadesPaginationData> {
		// Monta os parâmetros da query string com base nos filtros recebidos
		const queryParams =
			`page=${filters.page}&per_page=${filters.per_page}&text=${filters.text}` + // Parâmetros de paginação e busca
			(filters.sort_field ? `&sort_field=${filters.sort_field}` : '') + // Adiciona campo de ordenação, se presente
			(filters.sort_order ? `&sort_order=${filters.sort_order}` : ''); // Adiciona ordem de ordenação, se presente

		// Realiza a chamada HTTP GET para o endpoint 'entidades' e aplica transformações nos dados da resposta
		return this.httpService.get<{ data: IEntidadesPaginationData }>(`entidades?${queryParams}`).pipe(
			// Extrai os dados necessários do corpo da resposta HTTP
			map((res) => res.data)
		);
	}
}
