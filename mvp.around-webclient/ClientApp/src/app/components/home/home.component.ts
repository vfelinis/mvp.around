import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  geolocation$: Observable<Geolocation>;
  loggedIn$: Observable<boolean>;

  constructor(private geolocationService: GeolocationService, private oidcFacade: OidcFacade) {
    this.geolocation$ = this.geolocationService.selectGeolocation();
    this.loggedIn$ = this.oidcFacade.loggedIn$;
   }

  ngOnInit() {}

  signinPopup(): void {
    this.oidcFacade.signinPopup();
  }
}
