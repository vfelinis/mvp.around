import { Auth } from './../models/auth.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Signin = '[Auth] Signin',
  Signout = '[Auth] Signout',
}

export class Signin implements Action {
  readonly type = AuthActionTypes.Signin;
}

export class Signout implements Action {
  readonly type = AuthActionTypes.Signout;
}

export type AuthActions =
Signin | Signout;