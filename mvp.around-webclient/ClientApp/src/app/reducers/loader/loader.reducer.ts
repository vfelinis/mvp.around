import { Action } from '@ngrx/store';
import { LoaderActions, LoaderActionTypes } from 'src/app/actions/loader.actions';
import { Loader } from 'src/app/models/loader.model';


export const loaderFeatureKey = 'loader';

export interface LoaderState extends Loader {
}

export const initialState: LoaderState = {
  isLoading: false
};

export function reducer(
  state = initialState,
  action: LoaderActions
): LoaderState {
  switch (action.type) {
    case LoaderActionTypes.UpdateLoader: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
