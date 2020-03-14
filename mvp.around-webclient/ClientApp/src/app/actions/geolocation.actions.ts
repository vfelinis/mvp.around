import { Action } from '@ngrx/store';
import { Geolocation } from '../models/geolocation.model';

export enum GeolocationActionTypes {
  UpdateGeolocation = '[Geolocation] Update Geolocation'
}

export class UpdateGeolocation implements Action {
  readonly type = GeolocationActionTypes.UpdateGeolocation;

  constructor(public payload: Geolocation) {}
}

export type GeolocationActions =
  UpdateGeolocation;