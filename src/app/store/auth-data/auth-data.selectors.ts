import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthDataStore } from '@interfaces';

export const selectAuthDataSate = createFeatureSelector<IAuthDataStore>('authData');

export const selectAuthData = createSelector(selectAuthDataSate, (state) => state);
