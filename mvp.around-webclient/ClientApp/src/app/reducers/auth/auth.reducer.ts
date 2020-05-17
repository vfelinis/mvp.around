import { Auth } from 'src/app/models/auth.model';
import { AuthActions, AuthActionTypes } from 'src/app/actions/auth.actions';
import { createSelector } from '@ngrx/store';


export const authFeatureKey = 'auth';

export interface AuthState extends Auth {

}

export const initialState: AuthState = {
  loggedIn: false
};

export function reducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Signin: {
      return { loggedIn: true };
    }

    case AuthActionTypes.Signout: {
      return { loggedIn: false };
    }

    default: {
      return state;
    }
  }
}

export const selectAll = (state: AuthState) => state;

export const selectloggedIn = createSelector(
  selectAll,
  (state: AuthState) => state.loggedIn
);