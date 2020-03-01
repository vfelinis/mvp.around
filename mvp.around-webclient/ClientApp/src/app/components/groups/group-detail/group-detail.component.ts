import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectGroups } from 'src/app/reducers';
import { Group } from 'src/app/models/group.model';
import { selectEntry } from 'src/app/reducers/group/group.reducer';
import { LoadGroup } from 'src/app/actions/group.actions';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailComponent implements OnInit {

  group$: Observable<Group>;

  constructor(private store: Store<AppState>, private activateRoute: ActivatedRoute) {
    this.group$ = store.pipe(
      select(selectGroups),
      select(selectEntry, +activateRoute.snapshot.params['id'])
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadGroup({id: +this.activateRoute.snapshot.params['id']}))
  }

}
