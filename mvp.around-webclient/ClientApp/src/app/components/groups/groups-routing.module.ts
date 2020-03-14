import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { OidcGuard } from 'src/app/guards/oidc/oidc.guard';

const routes: Routes = [
  { path: '', component: GroupsComponent, canActivate: [OidcGuard] },
  { path: ':id', component: GroupDetailComponent, canActivate: [OidcGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
