import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';


export interface State {

  [fromUser.usersFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromUser.usersFeatureKey]: fromUser.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
