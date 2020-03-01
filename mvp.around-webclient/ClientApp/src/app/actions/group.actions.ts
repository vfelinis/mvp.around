import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Group } from '../models/group.model';

export enum GroupActionTypes {
  LoadGroups = '[Group] Load Groups',
  LoadGroupsSuccess = '[Group] Load Groups Success',
  LoadGroup = '[Group] Load Group',
  LoadGroupSuccess = '[Group] Load Group Success',
  AddGroup = '[Group] Add Group',
  AddGroupSuccess = '[Group] Add Group Success',
  UpdateGroup = '[Group] Update Group',
  UpdateGroupSuccess = '[Group] Update Group Success',
  ConnectGroup = '[Group] Connect Group',
  ConnectGroupSuccess = '[Group] Connect Group Success',
  DeleteGroup = '[Group] Delete Group',
  DeleteGroupSuccess = '[Group] Delete Group Success',
  ClearGroups = '[Group] Clear Groups',

  UpsertGroup = '[Group] Upsert Group',
  AddGroups = '[Group] Add Groups',
  UpsertGroups = '[Group] Upsert Groups',
  UpdateGroups = '[Group] Update Groups',
  DeleteGroups = '[Group] Delete Groups',
}

export class LoadGroups implements Action {
  readonly type = GroupActionTypes.LoadGroups;

  constructor() {}
}

export class LoadGroupsSuccess implements Action {
  readonly type = GroupActionTypes.LoadGroupsSuccess;

  constructor(public payload: { groups: Group[] }) {}
}

export class LoadGroup implements Action {
  readonly type = GroupActionTypes.LoadGroup;

  constructor(public payload: { id: number }) {}
}

export class LoadGroupSuccess implements Action {
  readonly type = GroupActionTypes.LoadGroupSuccess;

  constructor(public payload: { group: Group }) {}
}

export class AddGroup implements Action {
  readonly type = GroupActionTypes.AddGroup;

  constructor(public payload: { group: Group }) {}
}

export class AddGroupSuccess implements Action {
  readonly type = GroupActionTypes.AddGroupSuccess;

  constructor(public payload: { group: Group }) {}
}

export class UpdateGroup implements Action {
  readonly type = GroupActionTypes.UpdateGroup;

  constructor(public payload: { group: Update<Group> }) {}
}

export class UpdateGroupSuccess implements Action {
  readonly type = GroupActionTypes.UpdateGroupSuccess;

  constructor(public payload: { group: Update<Group> }) {}
}

export class ConnectGroup implements Action {
  readonly type = GroupActionTypes.ConnectGroup;

  constructor(public payload: { group: Group }) {}
}

export class ConnectGroupSuccess implements Action {
  readonly type = GroupActionTypes.ConnectGroupSuccess;

  constructor(public payload: { group: Group }) {}
}

export class DeleteGroup implements Action {
  readonly type = GroupActionTypes.DeleteGroup;

  constructor(public payload: { id: number }) {}
}

export class DeleteGroupSuccess implements Action {
  readonly type = GroupActionTypes.DeleteGroupSuccess;

  constructor(public payload: { id: number }) {}
}

export class ClearGroups implements Action {
  readonly type = GroupActionTypes.ClearGroups;
}

//****************************************** */

export class UpsertGroup implements Action {
  readonly type = GroupActionTypes.UpsertGroup;

  constructor(public payload: { group: Group }) {}
}

export class AddGroups implements Action {
  readonly type = GroupActionTypes.AddGroups;

  constructor(public payload: { groups: Group[] }) {}
}

export class UpsertGroups implements Action {
  readonly type = GroupActionTypes.UpsertGroups;

  constructor(public payload: { groups: Group[] }) {}
}

export class UpdateGroups implements Action {
  readonly type = GroupActionTypes.UpdateGroups;

  constructor(public payload: { groups: Update<Group>[] }) {}
}

export class DeleteGroups implements Action {
  readonly type = GroupActionTypes.DeleteGroups;

  constructor(public payload: { ids: number[] }) {}
}

export type GroupActions =
 LoadGroups
 | LoadGroupsSuccess
 | LoadGroup
 | LoadGroupSuccess
 | AddGroup
 | AddGroupSuccess
 | UpdateGroup
 | UpdateGroupSuccess
 | ConnectGroup
 | ConnectGroupSuccess
 | DeleteGroup
 | DeleteGroupSuccess
 | ClearGroups

 | UpsertGroup
 | AddGroups
 | UpsertGroups
 | UpdateGroups
 | DeleteGroups;
