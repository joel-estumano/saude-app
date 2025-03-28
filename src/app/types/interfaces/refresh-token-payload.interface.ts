export interface IRefreshTokenPayload {
	grant_type: 'refresh_token';
	client_id: number;
	client_secret: string;
	refresh_token: string;
	scope: '';
}
