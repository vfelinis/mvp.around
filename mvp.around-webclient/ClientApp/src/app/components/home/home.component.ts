import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import DG from '2gis-maps';
import { OidcFacade } from 'ng-oidc-client';

import { Geolocation } from '../../models/geolocation.model';
import { GeolocationService } from 'src/app/services/geolocationService';

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

  constructor(private geolocationService: GeolocationService, private oidcFacade: OidcFacade) {
    this.geolocation$ = this.geolocationService.selectGeolocation();
    this.loggedIn$ = this.oidcFacade.loggedIn$;
   }

  ngOnInit() {
    this.geolocationService.checkGeolocation();
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

  signinPopup(): void {
    this.oidcFacade.signinPopup();
  }

  // getPosition(position): void {
  //   this.lat = position.coords.longitude;
  //   this.lng = position.coords.latitude;

  //   this.map;
  // }

}
