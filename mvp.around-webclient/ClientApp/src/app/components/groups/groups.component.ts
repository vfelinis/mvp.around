import { LoadGroups, ClearGroups } from './../../actions/group.actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { NewGroupComponent } from './new-group/new-group.component';

import { UpdateGroup, DeleteGroup } from 'src/app/actions/group.actions';
import { Group } from 'src/app/models/group.model';
import { AppState, selectGroups } from 'src/app/reducers';
import { selectAll } from 'src/app/reducers/group/group.reducer';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  groups$: Observable<Group[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.groups$ = store.pipe(
      select(selectGroups),
      select(selectAll)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new ClearGroups());
    this.store.dispatch(new LoadGroups());
  }

  onCreate(): void {
    this.dialog.open(NewGroupComponent);
  }

  onSave(group: Group): void {
    const updateGroup: Update<Group> = {
      id: group.id,
      changes: group
    };
    this.store.dispatch(new UpdateGroup({group: updateGroup}));
  }

  onLeave(id: number): void {
    this.store.dispatch(new DeleteGroup({id: id}));
  }

}
