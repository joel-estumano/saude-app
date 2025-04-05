import { IJwtDecode } from './jwt-decode.interface';
import { ILoginResponse } from './login-response.interface';

export interface IAuthData {
	loginResponse: ILoginResponse;
	jwtDecode: IJwtDecode;
}
