import { IEntidadeData, IEntidadesPaginationDataStore } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const state = createFeatureSelector<IEntidadesPaginationDataStore>('entidades');

export const getEntidadesPagination = createSelector(state, (state: IEntidadesPaginationDataStore) => state);

export const getAllEntidades = createSelector(getEntidadesPagination, (state: IEntidadesPaginationDataStore): IEntidadeData[] => state.data.data);

export const getEntidadeByUuid = (uuid: string) => createSelector(getAllEntidades, (entidades) => entidades.find((entidade) => entidade.uuid === uuid) || null);
