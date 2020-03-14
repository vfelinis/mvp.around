import { ClearUsers } from './../../actions/user.actions';
import { User } from '../../models/user.model';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { createSelector } from '@ngrx/store';

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[]
}

export const initialState: UsersState = {
  users: []
}

export function reducer(
  state = initialState,
  action: UserActions
): UsersState {
  switch (action.type) {
    case UserActionTypes.UpsertUser: {
      return {...state,
         users: [
           ...state.users.filter(s => s.groupId !== action.payload.user.groupId && s.userName !== action.payload.user.userName),
           action.payload.user
          ]
        };
    }

    case UserActionTypes.DeleteUser: {
      return {...state,
         users: [
           ...state.users.filter(s => s.groupId !== action.payload.user.groupId && s.userName !== action.payload.user.userName)
          ]
        };
    }

    case UserActionTypes.ClearUsers: {
      return {...state,
         users: []
        };
    }

    default: {
      return state;
    }
  }
}

export const selectAll = (state: UsersState) => state.users;

export const selectUsersForGroup = createSelector(
  selectAll,
  (users: User[], groupId: number) => users.filter(s => s.groupId === groupId)
);