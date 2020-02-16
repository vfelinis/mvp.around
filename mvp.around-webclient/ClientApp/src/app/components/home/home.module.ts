import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import * as from from './reducers';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature(from.FeatureKey, from.reducers, { metaReducers: from.metaReducers })
  ]
})
export class HomeModule { }
