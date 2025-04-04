import { IEntidadeData, IEntidadesPaginationDataStore } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const state = createFeatureSelector<IEntidadesPaginationDataStore>('entidades');

export const selectEntidadesPagination = createSelector(state, (state: IEntidadesPaginationDataStore) => state);

export const selectEntidades = createSelector(selectEntidadesPagination, (state: IEntidadesPaginationDataStore): IEntidadeData[] => state.data.data);

export const selectEntidadeByUuid = (uuid: string) =>
	createSelector(selectEntidades, (entidades) => entidades.find((entidade) => entidade.uuid === uuid) || null);

export const selectEntidadesPaginationError = createSelector(selectEntidadesPagination, (state: IEntidadesPaginationDataStore) => state.error);
