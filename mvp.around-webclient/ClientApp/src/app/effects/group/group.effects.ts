import { Injectable } from '@angular/core';
import { Actions, ofType , createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GroupService } from 'src/app/services/groupService';
import { GroupActionTypes, AddGroups } from 'src/app/actions/group.actions';
import { Group } from 'src/app/models/group.model';



@Injectable()
export class GroupEffects {

  constructor(private actions$: Actions, private service: GroupService) {

  }

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.LoadGroups),
    mergeMap(() => this.service.getGroups()
      .pipe(
        map(response => new AddGroups({ groups: (<any>response).data })),
        catchError(() => EMPTY)
      ))
    )
  );

}
