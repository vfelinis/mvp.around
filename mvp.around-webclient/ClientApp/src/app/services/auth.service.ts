import { User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuth } from '../reducers';
import { selectloggedIn } from '../reducers/auth/auth.reducer';
import { Signin, Signout } from '../actions/auth.actions';

export { User };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userManager: UserManager;

  constructor(private store: Store<AppState>, private router: Router) {
    const settings: UserManagerSettings = {
        authority: !environment.production ? 'https://localhost:5001' : 'https://identity.mvp-stack.com',
        client_id: 'around-client',
        redirect_uri: !environment.production ? 'https://localhost:5003/callback.html' : 'https://mvp-stack.com/callback.html',
        response_type: 'code',
        scope: 'openid offline_access api spa',
        post_logout_redirect_uri: !environment.production ? 'https://localhost:5003/signout-callback.html' : 'https://mvp-stack.com/signout-callback.html',
        silent_redirect_uri: !environment.production ? 'https://localhost:5003/renew-callback.html' : 'https://mvp-stack.com/renew-callback.html',
        accessTokenExpiringNotificationTime: 10,
        automaticSilentRenew: true,
        userStore: new WebStorageStateStore({ store: window.localStorage })
    };
    this.userManager = new UserManager(settings);
  }

  public selectloggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(selectAuth),
      select(selectloggedIn)
    );
  }

  public init(): void {
    this.getUser().pipe(
      take(1),
      switchMap(user => {
        return this.selectloggedIn().pipe(
          take(1),
          map(loggedIn => {
            if (!loggedIn && user && !user.expired)
            {
              this.store.dispatch(new Signin());
            }
          })
        );
      })
    ).subscribe(value => console.log('launch'));
  }

  public getUser(): Observable<User> {
    return from(this.userManager.getUser());
  }

  public signinPopup(): void {
    this.userManager.signinPopup()
    .then(user => {
      if (user && !user.expired) {
        this.store.dispatch(new Signin());
      }
    })
    .catch(err => console.error(err));
  }

  public signoutPopup(popup: boolean = true): void {
    if (popup) {
      this.userManager.signoutPopup().catch(err => console.error(err));
    }
    this.store.dispatch(new Signout());
    this.router.navigate(['/']);
  }
}