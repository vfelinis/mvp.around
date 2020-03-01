import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OidcInterceptorService implements HttpInterceptor {
  static OidcInterceptorService: any;
  constructor(private router: Router, private oidcFacade: OidcFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcFacade.identity$.pipe(
      switchMap(user => {
        if (user && !user.expired && user.access_token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
        }
        return next.handle(req).pipe(
          tap(() => {},
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.oidcFacade.signoutPopup();
                  this.router.navigate(['/']);
                }
              }
            }
          )
        );
      })
    );
  }
}