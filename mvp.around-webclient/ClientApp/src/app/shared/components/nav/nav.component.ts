import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  identity$: Observable<User>;
  loggedIn$: Observable<boolean>;

  constructor(private oidcFacade: OidcFacade) {
    this.loggedIn$ = oidcFacade.loggedIn$;
    this.identity$ = oidcFacade.identity$;
   }

  ngOnInit(): void {
  }

  loginPopup(): void {
    this.oidcFacade.signinPopup();
  }

  logoutPopup(): void {
    this.oidcFacade.signoutPopup();
  }

}
