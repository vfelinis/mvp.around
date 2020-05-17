import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OidcGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUser().pipe(
        take(1),
        switchMap(user => {
          console.log('Auth Guard - Checking if user exists', user);
          console.log('Auth Guard - Checking if user is expired:', user && user.expired);
          if (user && !user.expired) {
            return of(true);
          } else {
            this.authService.signoutPopup(false);
            return of(false);
          }
        })
      );
  }
  
}
