import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  title = 'around';

  constructor(private router: Router, private oidcFacade: OidcFacade) {

   }

   ngOnInit() {
    this.oidcFacade.getOidcUser();
    this.oidcFacade.loggedIn$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (!result && this.router.url !== '/') {
        this.router.navigate(['/']);
      }
    });
   }

   ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
