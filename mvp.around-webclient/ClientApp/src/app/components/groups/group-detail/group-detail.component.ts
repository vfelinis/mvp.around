import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailComponent implements OnInit {

  group$: Observable<Group>;

  constructor(private service: GroupService, private activatedRoute: ActivatedRoute) {
    this.group$ = this.service.selectGroup(+activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.service.getGroup(+this.activatedRoute.snapshot.params['id']);
  }

}
