import { Injectable } from '@angular/core';
import { Actions, ofType , createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GroupService } from 'src/app/services/groupService';
import { GroupActionTypes, LoadGroupsSuccess, LoadGroup, LoadGroupSuccess,
   AddGroup, AddGroupSuccess, UpdateGroupSuccess, ConnectGroup, ConnectGroupSuccess, DeleteGroup, DeleteGroupSuccess, UpdateGroup
} from 'src/app/actions/group.actions';
import { Group } from 'src/app/models/group.model';



@Injectable()
export class GroupEffects {

  constructor(private actions$: Actions, private service: GroupService) {

  }

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.LoadGroups),
    mergeMap(() => this.service.getGroups()
      .pipe(
        map(response => new LoadGroupsSuccess({groups: response.groups})),
        catchError(() => EMPTY)
      ))
    )
  );

  loadGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.LoadGroup),
    mergeMap((action: LoadGroup) => this.service.GetGroup(action.payload.id)
      .pipe(
        map(response => new LoadGroupSuccess({group: response.group})),
        catchError(() => EMPTY)
      ))
    )
  );

  addGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.AddGroup),
    mergeMap((action: AddGroup) => this.service.createGroup({group: action.payload.group})
      .pipe(
        map(response => new AddGroupSuccess({group: {...action.payload.group, id: response.id}})),
        catchError(() => EMPTY)
      ))
    )
  );

  updateGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.UpdateGroup),
    mergeMap((action: UpdateGroup) => this.service.UpdateGroup({group: <Group>action.payload.group.changes})
      .pipe(
        map(response => new UpdateGroupSuccess({group: action.payload.group})),
        catchError(() => EMPTY)
      ))
    )
  );

  connectGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.ConnectGroup),
    mergeMap((action: ConnectGroup) => this.service.ConnectGroup({group: action.payload.group})
      .pipe(
        map(response => new ConnectGroupSuccess({group: action.payload.group})),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActionTypes.DeleteGroup),
    mergeMap((action: DeleteGroup) => this.service.LeaveGroup(action.payload.id)
      .pipe(
        map(response => new DeleteGroupSuccess({id: action.payload.id})),
        catchError(() => EMPTY)
      ))
    )
  );

}
