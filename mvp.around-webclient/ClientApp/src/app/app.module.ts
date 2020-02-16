import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgOidcClientModule, Config } from 'ng-oidc-client';
import { WebStorageStateStore, Log } from 'oidc-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { UserEffects } from './effects/user/user.effects';

import { environment } from '../environments/environment';

export const oidcConfigSettings: Config = {
  oidc_config: {
    authority: 'https://localhost:5001',
    client_id: 'around-client',
    redirect_uri: 'http://localhost:4200/callback.html',
    response_type: 'code',
    scope: 'openid profile offline_access api',
    post_logout_redirect_uri: 'http://localhost:4200/signout-callback.html',
    silent_redirect_uri: 'http://localhost:4200/renew-callback.html',
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  },
  log: {
    logger: console,
    level: Log.NONE
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'ng-oidc-client',
      logOnly: true
    }) : [],
    EffectsModule.forRoot([UserEffects]),
    NgOidcClientModule.forRoot(oidcConfigSettings),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
