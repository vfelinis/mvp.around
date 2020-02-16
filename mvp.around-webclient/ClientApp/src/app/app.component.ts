import { Component } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'around';

  constructor(private oidcFacade: OidcFacade) {

   }

   ngOnInit() {
    this.oidcFacade.getOidcUser();
   }
}
