import { AuthService } from './../services/auth.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class OidcInterceptorService implements HttpInterceptor {
  static OidcInterceptorService: any;
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getUser().pipe(
      take(1),
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
                  this.authService.signoutPopup();
                }
              }
            }
          )
        );
      })
    );
  }
}