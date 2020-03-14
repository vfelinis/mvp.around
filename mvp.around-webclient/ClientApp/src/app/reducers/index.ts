import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromGeolocation from './geolocation/geolocation.reducer';
import * as fromGroups from './group/group.reducer';
import * as fromUsers from './user/user.reducer';


export interface AppState {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.GeolocationState;
  [fromGroups.groupsFeatureKey]: fromGroups.GroupsState;
  [fromUsers.usersFeatureKey]: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.reducer,
  [fromGroups.groupsFeatureKey]: fromGroups.reducer,
  [fromUsers.usersFeatureKey]: fromUsers.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectGeolocation = createFeatureSelector<AppState, fromGeolocation.GeolocationState>(fromGeolocation.geolocationFeatureKey);
export const selectGroups = createFeatureSelector<AppState, fromGroups.GroupsState>(fromGroups.groupsFeatureKey);
export const selectUsers = createFeatureSelector<AppState, fromUsers.UsersState>(fromUsers.usersFeatureKey);