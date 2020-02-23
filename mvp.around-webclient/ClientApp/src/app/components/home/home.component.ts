import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import DG from '2gis-maps';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { OidcFacade } from 'ng-oidc-client';
import { User } from 'oidc-client';
import { Store, select } from '@ngrx/store';

import { AppState, selectGeolocation } from '../../reducers/index';
import { UpdateGeolocation } from '../../actions/geolocation.actions';
import { Geolocation } from '../../models/geolocation.model';

import { checkGeolocation } from '../../helpers/geolocationHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  // private map: any;
  // private marker: any = DG.marker([0, 0]);
  // private lat: number = 0;
  // private lng: number = 0;
  // objectKeys = Object.keys;

  geolocation$: Observable<Geolocation>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>, private oidcFacade: OidcFacade) {
    this.geolocation$ = store.pipe(select(selectGeolocation));
    this.loggedIn$ = oidcFacade.loggedIn$;

    this.updateGeolocation = this.updateGeolocation.bind(this);
   }

  ngOnInit() {
    checkGeolocation(this.updateGeolocation);
    // this.map = DG.map('map', {
    //   'center': [this.lat, this.lng],
    //   'zoom': 13
    // });
    // this.marker.addTo(this.map);
    // this.map.locate({setView: true, watch: true})
    //     .on('locationfound', (e) => {
    //       this.marker.setLatLng([e.latitude, e.longitude]);
    //     })
    //     .on('locationerror', (e) => {
    //       DG.popup()
    //         .setLatLng(this.map.getCenter())
    //         .setContent('Доступ к определению местоположения отключён')
    //         .openOn(this.map);
    //     });
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => this.getPosition(position));
    // }
  }

  updateGeolocation(isAvailable: boolean, lat: string = null, lng: string = null): void {
    const geolocation: Geolocation = {
      isAvailable: isAvailable,
      lat: lat,
      lng: lng
    };
    this.store.dispatch(new UpdateGeolocation(geolocation));
  }

  signinPopup(): void {
    this.oidcFacade.signinPopup();
  }

  // getPosition(position): void {
  //   this.lat = position.coords.longitude;
  //   this.lng = position.coords.latitude;

  //   this.map;
  // }

}
