import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Group } from '../models/group.model';

export enum GroupActionTypes {
  LoadGroups = '[Group] Load Groups',
  LoadGroup = '[Group] Load Group',
  AddGroup = '[Group] Add Group',
  UpdateGroup = '[Group] Update Group',
  ConnectGroup = '[Group] Connect Group',
  DeleteGroup = '[Group] Delete Group',
  ClearGroups = '[Group] Clear Groups',

  UpsertGroup = '[Group] Upsert Group',
  AddGroups = '[Group] Add Groups',
  UpsertGroups = '[Group] Upsert Groups',
  UpdateGroups = '[Group] Update Groups',
  DeleteGroups = '[Group] Delete Groups',
}

export class LoadGroups implements Action {
  readonly type = GroupActionTypes.LoadGroups;

  constructor(public payload: { groups: Group[] }) {}
}

export class LoadGroup implements Action {
  readonly type = GroupActionTypes.LoadGroup;

  constructor(public payload: { group: Group }) {}
}

export class AddGroup implements Action {
  readonly type = GroupActionTypes.AddGroup;

  constructor(public payload: { group: Group }) {}
}

export class UpdateGroup implements Action {
  readonly type = GroupActionTypes.UpdateGroup;

  constructor(public payload: { group: Update<Group> }) {}
}

export class ConnectGroup implements Action {
  readonly type = GroupActionTypes.ConnectGroup;

  constructor(public payload: { group: Group }) {}
}

export class DeleteGroup implements Action {
  readonly type = GroupActionTypes.DeleteGroup;

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
 | LoadGroup
 | AddGroup
 | UpdateGroup
 | ConnectGroup
 | DeleteGroup
 | ClearGroups

 | UpsertGroup
 | AddGroups
 | UpsertGroups
 | UpdateGroups
 | DeleteGroups;
