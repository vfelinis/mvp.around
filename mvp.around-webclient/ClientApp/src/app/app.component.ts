import { Component, OnInit } from '@angular/core';

import { GeolocationService } from 'src/app/services/geolocationService';
import { Geolocation } from 'src/app/models/geolocation.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'around';
  geolocation: Geolocation;

  constructor(private geolocationService: GeolocationService, private authService: AuthService) {
    this.authService.init();
    this.geolocationService.selectGeolocation().subscribe(s => this.geolocation = s);
  }

  ngOnInit() {
    this.checkGeolocation();
  }

  checkGeolocation() {
    this.geolocationService.checkGeolocation();
    setTimeout(() => {
      this.checkGeolocation();
    }, 10000);
  }
}
