import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'around';

  constructor(private router: Router, private oidcFacade: OidcFacade) {}

   ngOnInit() {
    this.oidcFacade.getOidcUser();
   }
}
