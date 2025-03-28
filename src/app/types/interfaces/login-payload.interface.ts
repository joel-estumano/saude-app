export interface ILoginPayload {
	grant_type: 'password';
	client_id: number;
	client_secret: string;
	username: string;
	password: string;
	scope: '';
}
