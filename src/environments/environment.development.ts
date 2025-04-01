/**
 * Configuração do ambiente para a aplicação.
 *
 * Propriedades:
 * - clientId: Identificador único do cliente, gerado pela API e utilizado para autenticação via OAuth. Deve ser um número.
 * - clientSecret: Segredo associado ao cliente, também gerado pela API e utilizado para autenticação via OAuth. Deve ser uma string.
 * - apiURL: URL base para acessar a API. Deve ser uma string representando o endpoint.
 */
export const environment = {
	clientId: 6, // O ID do cliente gerado pela API e utilizado para autenticação via OAuth
	clientSecret: 's3jlOUrkZCMLLTbsq1EpzT5ped8s4tNaDd0fkgsH', // O segredo gerado pela API e utilizado para autenticação via OAuth
	apiURL: 'api' // Substitua com o endpoint da API
};
