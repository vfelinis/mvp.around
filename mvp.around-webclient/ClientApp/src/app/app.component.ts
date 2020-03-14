import { Component, OnInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

import { GeolocationService } from 'src/app/services/geolocationService';
import { Geolocation } from 'src/app/models/geolocation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'around';
  geolocation: Geolocation;

  constructor(private geolocationService: GeolocationService, private oidcFacade: OidcFacade) {
    this.geolocationService.selectGeolocation().subscribe(s => this.geolocation = s);
  }

   ngOnInit() {
    this.oidcFacade.getOidcUser();
    this.checkGeolocation();
   }

   checkGeolocation() {
    this.geolocationService.checkGeolocation();
    setTimeout(() => {
      this.checkGeolocation();
    }, 10000);
   }
}
