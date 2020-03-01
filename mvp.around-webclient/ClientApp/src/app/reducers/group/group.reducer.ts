import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Group } from '../../models/group.model';
import { GroupActions, GroupActionTypes } from '../../actions/group.actions';

export const groupsFeatureKey = 'groups';

export interface GroupsState extends EntityState<Group> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialState: GroupsState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: GroupActions
): GroupsState {
  switch (action.type) {
    case GroupActionTypes.LoadGroupsSuccess: {
      return adapter.addAll(action.payload.groups, state);
    }

    case GroupActionTypes.LoadGroupSuccess: {
      return adapter.upsertOne(action.payload.group, state);
    }

    case GroupActionTypes.AddGroupSuccess: {
      return adapter.addOne(action.payload.group, state);
    }

    case GroupActionTypes.UpdateGroupSuccess: {
      return adapter.updateOne(action.payload.group, state);
    }

    case GroupActionTypes.DeleteGroupSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case GroupActionTypes.ClearGroups: {
      return adapter.removeAll(state);
    }

    //*************************************************** */

    case GroupActionTypes.UpsertGroup: {
      return adapter.upsertOne(action.payload.group, state);
    }

    case GroupActionTypes.AddGroups: {
      return adapter.addMany(action.payload.groups, state);
    }

    case GroupActionTypes.UpsertGroups: {
      return adapter.upsertMany(action.payload.groups, state);
    }

    case GroupActionTypes.UpdateGroups: {
      return adapter.updateMany(action.payload.groups, state);
    }

    case GroupActionTypes.DeleteGroups: {
      return adapter.removeMany(action.payload.ids, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectEntry = createSelector(
  selectAll,
  (groups: Group[], id: number) => groups.find(s => s.id === id)
);
