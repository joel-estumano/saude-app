import { IEntidadeData, IEntidadesPaginationDataStore } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const state = createFeatureSelector<IEntidadesPaginationDataStore>('entidades');

export const getEntidadesPaginationSelector = createSelector(state, (state: IEntidadesPaginationDataStore) => state);

export const getEntidadesSelector = createSelector(getEntidadesPaginationSelector, (state: IEntidadesPaginationDataStore): IEntidadeData[] => state.data.data);

export const getEntidadeByUuidSelector = (uuid: string) =>
	createSelector(getEntidadesSelector, (entidades) => entidades.find((entidade) => entidade.uuid === uuid) || null);

export const getEntidadesErrorSelector = createSelector(getEntidadesPaginationSelector, (state: IEntidadesPaginationDataStore) => state.error);
