import { IUser } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<IUser | null>('user');

export const selectUser = createSelector(selectUserState, (state) => state);
