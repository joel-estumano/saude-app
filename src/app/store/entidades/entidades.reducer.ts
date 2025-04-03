import { createReducer, on } from '@ngrx/store';
import { IEntidadesPaginationDataStore } from '@interfaces';
import { loadEntidadesPagination, loadEntidadesPaginationError, loadEntidadesPaginationSuccess, updateEntidade } from './entidades.actions';

export const initialState: IEntidadesPaginationDataStore = {
	data: {
		current_page: 0,
		data: [],
		from: 0,
		last_page: 0,
		next_page_url: null,
		per_page: 4,
		prev_page_url: null,
		to: 0,
		total: 0
	},
	isLoading: false,
	error: null
};

export const entidadesReducer = createReducer(
	initialState,
	// Define isLoading como true quando a ação de carregamento é disparada
	on(loadEntidadesPagination, (state) => ({
		...state,
		isLoading: true,
		error: null
	})),
	// Atualiza o estado com os dados retornados pelo serviço
	on(loadEntidadesPaginationSuccess, (state, { data }) => ({
		...state,
		data: data,
		isLoading: false,
		error: null
	})),
	// Trata erros e define isLoading como false
	on(loadEntidadesPaginationError, (state, { error }) => ({
		...state,
		isLoading: false,
		error
	})),
	// Atualiza a entidade correspondente pelo UUID
	on(updateEntidade, (state, { uuid, entidade }) => ({
		...state,
		data: {
			...state.data,
			data: state.data.data.map((item) => (item.uuid === uuid ? { ...item, ...entidade } : item))
		}
	}))
);
