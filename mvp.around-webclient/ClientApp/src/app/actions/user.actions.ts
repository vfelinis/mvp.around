import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
  UpsertUser = '[User] Upsert User',
  DeleteUser = '[User] Delete User',
  ClearUsers = '[User] Clear User'
}

export class UpsertUser implements Action {
  readonly type = UserActionTypes.UpsertUser;

  constructor(public payload: { user: User }) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;

  constructor(public payload: { user: User }) {}
}

export class ClearUsers implements Action {
  readonly type = UserActionTypes.ClearUsers;
}

export type UserActions =
  UpsertUser
  | DeleteUser
  | ClearUsers;