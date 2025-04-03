import { IEntidadeData } from './entidade-data.interface';

export interface IEntidadesPaginationData {
	current_page: number;
	data: IEntidadeData[];
	from: number;
	last_page: number;
	next_page_url: number | null;
	per_page: number;
	prev_page_url: number | null;
	to: number;
	total: number;
}
