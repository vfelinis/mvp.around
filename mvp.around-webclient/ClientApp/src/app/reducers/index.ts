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
import * as fromLoader from './loader/loader.reducer';
import * as fromAuth from './auth/auth.reducer';


export interface AppState {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.GeolocationState;
  [fromGroups.groupsFeatureKey]: fromGroups.GroupsState;
  [fromUsers.usersFeatureKey]: fromUsers.UsersState;
  [fromLoader.loaderFeatureKey]: fromLoader.LoaderState;
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromGeolocation.geolocationFeatureKey]: fromGeolocation.reducer,
  [fromGroups.groupsFeatureKey]: fromGroups.reducer,
  [fromUsers.usersFeatureKey]: fromUsers.reducer,
  [fromLoader.loaderFeatureKey]: fromLoader.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectGeolocation = createFeatureSelector<AppState, fromGeolocation.GeolocationState>(fromGeolocation.geolocationFeatureKey);
export const selectGroups = createFeatureSelector<AppState, fromGroups.GroupsState>(fromGroups.groupsFeatureKey);
export const selectUsers = createFeatureSelector<AppState, fromUsers.UsersState>(fromUsers.usersFeatureKey);
export const selectLoader = createFeatureSelector<AppState, fromLoader.LoaderState>(fromLoader.loaderFeatureKey);
export const selectAuth = createFeatureSelector<AppState, fromAuth.AuthState>(fromAuth.authFeatureKey);