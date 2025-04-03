export interface IEntidadesPaginationFilters {
	text: string;
	page: number;
	per_page: number;
	sort_field: string;
	sort_order: 'asc' | 'desc';
}
