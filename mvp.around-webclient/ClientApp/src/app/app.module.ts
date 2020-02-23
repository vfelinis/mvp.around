import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgOidcClientModule, Config } from 'ng-oidc-client';
import { WebStorageStateStore, Log } from 'oidc-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { UserEffects } from './effects/user/user.effects';

import { environment } from '../environments/environment';
import { NavComponent } from './shared/components/nav/nav.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { LinkComponent } from './shared/components/link/link.component';

export const oidcConfigSettings: Config = {
  oidc_config: {
    authority: !environment.production ? 'https://localhost:5001' : 'https://identity.mvp-stack.com',
    client_id: 'around-client',
    redirect_uri: !environment.production ? 'https://localhost:5003/callback.html' : 'https://mvp-stack.com/callback.html',
    response_type: 'code',
    scope: 'openid offline_access api',
    post_logout_redirect_uri: !environment.production ? 'https://localhost:5003/signout-callback.html' : 'https://mvp-stack.com/signout-callback.html',
    silent_redirect_uri: !environment.production ? 'https://localhost:5003/renew-callback.html' : 'https://mvp-stack.com/renew-callback.html',
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
    AppComponent,
    NavComponent,
    ButtonComponent,
    LinkComponent
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
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
