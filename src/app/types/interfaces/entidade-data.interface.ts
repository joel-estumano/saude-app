import { IEntidadeAddPayload } from './entidade-add-payload.interface';
import { IEspecialidadeData } from './especialidade-data.interface';
import { IRegionalData } from './regional-data.interface';

export interface IEntidadeData extends Omit<IEntidadeAddPayload, 'especialidades'> {
	created_at: string;
	updated_at: string;
	uuid: string;
	especialidades: IEspecialidadeData[];
	regional: IRegionalData;
}
