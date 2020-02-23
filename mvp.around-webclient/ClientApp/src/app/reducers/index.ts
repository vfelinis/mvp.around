import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromGeolocation from './geolocation/geolocation.reducer';
import * as fromGroup from './group/group.reducer';


export interface AppState {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.GeolocationState;
  [fromGroup.groupsFeatureKey]: fromGroup.GroupsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.reducer,
  [fromGroup.groupsFeatureKey]: fromGroup.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];