import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: ':id', component: GroupDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
