import { Loader } from './../models/loader.model';
import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  UpdateLoader = '[Loader] Update Loader'
}

export class UpdateLoader implements Action {
  readonly type = LoaderActionTypes.UpdateLoader;

  constructor(public payload: Loader) {}
}

export type LoaderActions =
UpdateLoader;