import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState, selectGeolocation } from '../reducers';
import { Geolocation } from '../models/geolocation.model';
import { UpdateGeolocation } from '../actions/geolocation.actions';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public selectGeolocation(): Observable<Geolocation> {
    return this.store.pipe(select(selectGeolocation));
  }

  constructor (private store: Store<AppState>, private router: Router) {

    this.updateGeolocation = this.updateGeolocation.bind(this);
  }

  updateGeolocation(isAvailable: boolean, lat: number = 0, lng: number = 0): void {
    const geolocation: Geolocation = {
      isAvailable: isAvailable,
      lat: lat,
      lng: lng
    };
    this.store.dispatch(new UpdateGeolocation(geolocation));
    if (!geolocation.isAvailable) {
      this.router.navigate(['/']);
    }
  }

  checkGeolocation(): void {
    if (navigator?.geolocation) {
      const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      };
      const resolve = (pos) => {
          if (pos?.coords){
            this.updateGeolocation(true, pos.coords.latitude, pos.coords.longitude);
          } else {
            this.updateGeolocation(false);
          }
      };
      const reject = () => this.updateGeolocation(false);
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
      this.updateGeolocation(false);
    }
  }
}