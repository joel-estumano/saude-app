import { IUser } from './user.interface';

export interface ILoginResponse {
	token_type: 'Bearer';
	expires_in: number;
	access_token: string;
	refresh_token: string;
	user: IUser;
}
