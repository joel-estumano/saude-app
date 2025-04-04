/**
 * Configuração do ambiente para a aplicação.
 *
 * Propriedades:
 * - clientId: Identificador único do cliente, gerado pela API e utilizado para autenticação via OAuth. Deve ser um número.
 * - clientSecret: Segredo associado ao cliente, também gerado pela API e utilizado para autenticação via OAuth. Deve ser uma string.
 * - apiURL: URL base para acessar a API. Deve ser uma string representando o endpoint.
 */
export const environment = {
	clientId: 0, // O ID do cliente gerado pela API e utilizado para autenticação via OAuth
	clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // O segredo gerado pela API e utilizado para autenticação via OAuth
	apiURL: 'api' // Não precisa substituir
};
