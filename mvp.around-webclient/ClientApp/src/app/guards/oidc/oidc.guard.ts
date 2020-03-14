import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OidcFacade } from 'ng-oidc-client';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OidcGuard implements CanActivate {

  constructor(private router: Router, private oidcFacade: OidcFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.oidcFacade.identity$.pipe(
        take(1),
        switchMap(user => {
          console.log('Auth Guard - Checking if user exists', user);
          console.log('Auth Guard - Checking if user is expired:', user && user.expired);
          if (user && !user.expired) {
            return of(true);
          } else {
            this.router.navigate(['/']);
            return of(false);
          }
        })
      );
  }
  
}
