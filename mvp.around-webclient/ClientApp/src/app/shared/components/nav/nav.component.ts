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

  loggedIn$: Observable<boolean>;

  constructor(private oidcFacade: OidcFacade) {
    this.loggedIn$ = oidcFacade.loggedIn$;
   }

  ngOnInit(): void {
  }

  signinPopup(): void {
    this.oidcFacade.signinPopup();
  }

  signoutPopup(): void {
    this.oidcFacade.signoutPopup();
  }

}
