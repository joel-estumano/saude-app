import { IAuthData } from './auth-data.interface';

export interface IAuthDataStore extends IAuthData {
	valid: boolean;
	error: string;
}
