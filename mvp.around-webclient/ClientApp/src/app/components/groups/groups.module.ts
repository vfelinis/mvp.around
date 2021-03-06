import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { ConnectGroupComponent } from './connect-group/connect-group.component';

import { UsersFilterPipe } from 'src/app/pipes/users-filter/users-filter.pipe';



@NgModule({
  declarations: [GroupsComponent, NewGroupComponent, GroupItemComponent, GroupDetailComponent, ConnectGroupComponent, UsersFilterPipe],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    NewGroupComponent
  ]
})
export class GroupsModule { }
