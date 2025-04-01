import { EntidadeAddPayload } from './entidade-add-payload.interface';
import { IEspecialidadeData } from './especialidade-data.interface';

export interface EntidadeData extends Omit<EntidadeAddPayload, 'especialidades'> {
	created_at: string;
	updated_at: string;
	uuid: string;
	especialidades: IEspecialidadeData[];
}
