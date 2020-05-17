import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatCardModule } from '@angular/material/card';
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

import { NavComponent } from './shared/components/nav/nav.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { LinkComponent } from './shared/components/link/link.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { GroupService } from './services/groupService';
import { OidcInterceptorService } from './interceptors/oidcInterceptorService';
import { GeolocationService } from './services/geolocationService';
import { OidcGuard } from './guards/oidc/oidc.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ButtonComponent,
    LinkComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    GroupService,
    GeolocationService,
    OidcGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OidcInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
