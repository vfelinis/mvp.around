import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { NewGroupComponent } from './new-group/new-group.component';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  groups$: Observable<Group[]>;

  constructor(private service: GroupService, private dialog: MatDialog) {
    this.groups$ = this.service.selectGroups();
  }

  ngOnInit(): void {
    this.service.getGroups();
  }

  onCreate(): void {
    this.dialog.open(NewGroupComponent);
  }

  onSave(group: Group): void {
    this.service.updateGroup(group);
  }

  onLeave(id: number): void {
    this.service.leaveGroup(id);
  }

}
