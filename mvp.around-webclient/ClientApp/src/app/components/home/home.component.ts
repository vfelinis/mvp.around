import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Geolocation } from '../../models/geolocation.model';
import { GeolocationService } from 'src/app/services/geolocationService';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  geolocation$: Observable<Geolocation>;
  loggedIn$: Observable<boolean>;

  constructor(private geolocationService: GeolocationService, private authService: AuthService) {
    this.geolocation$ = this.geolocationService.selectGeolocation();
    this.loggedIn$ = this.authService.selectloggedIn();
   }

  ngOnInit() {}

  signinPopup(): void {
    this.authService.signinPopup();
  }
}
