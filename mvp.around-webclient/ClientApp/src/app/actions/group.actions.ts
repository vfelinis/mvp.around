import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Group } from '../models/group.model';

export enum GroupActionTypes {
  LoadGroups = '[Group] Load Groups',
  AddGroup = '[Group] Add Group',
  UpsertGroup = '[Group] Upsert Group',
  AddGroups = '[Group] Add Groups',
  UpsertGroups = '[Group] Upsert Groups',
  UpdateGroup = '[Group] Update Group',
  UpdateGroups = '[Group] Update Groups',
  DeleteGroup = '[Group] Delete Group',
  DeleteGroups = '[Group] Delete Groups',
  ClearGroups = '[Group] Clear Groups'
}

export class LoadGroups implements Action {
  readonly type = GroupActionTypes.LoadGroups;

  constructor(public payload: { groups: Group[] }) {}
}

export class AddGroup implements Action {
  readonly type = GroupActionTypes.AddGroup;

  constructor(public payload: { group: Group }) {}
}

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

export class UpdateGroup implements Action {
  readonly type = GroupActionTypes.UpdateGroup;

  constructor(public payload: { group: Update<Group> }) {}
}

export class UpdateGroups implements Action {
  readonly type = GroupActionTypes.UpdateGroups;

  constructor(public payload: { groups: Update<Group>[] }) {}
}

export class DeleteGroup implements Action {
  readonly type = GroupActionTypes.DeleteGroup;

  constructor(public payload: { id: number }) {}
}

export class DeleteGroups implements Action {
  readonly type = GroupActionTypes.DeleteGroups;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearGroups implements Action {
  readonly type = GroupActionTypes.ClearGroups;
}

export type GroupActions =
 LoadGroups
 | AddGroup
 | UpsertGroup
 | AddGroups
 | UpsertGroups
 | UpdateGroup
 | UpdateGroups
 | DeleteGroup
 | DeleteGroups
 | ClearGroups;
