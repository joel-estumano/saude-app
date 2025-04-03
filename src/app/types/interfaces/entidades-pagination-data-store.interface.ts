import { HttpErrorResponse } from '@angular/common/http';
import { IEntidadesPaginationData } from '@interfaces';

export interface IEntidadesPaginationDataStore {
	data: IEntidadesPaginationData;
	isLoading?: boolean;
	error?: HttpErrorResponse | null;
}
