import { Geolocation } from '../../models/geolocation.model';
import { GeolocationActions, GeolocationActionTypes } from '../../actions/geolocation.actions';

export const geolocationFeatureKey = 'geolocation';

export interface GeolocationState extends Geolocation {
  // additional entities state properties
}

export const initialState: GeolocationState = {
  isAvailable: false,
  lat: null,
  lng: null
}

export function reducer(
  state = initialState,
  action: GeolocationActions
): GeolocationState {
  switch (action.type) {
    case GeolocationActionTypes.UpdateGeolocation: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}