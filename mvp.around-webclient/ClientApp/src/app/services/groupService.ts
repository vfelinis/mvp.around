import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Group } from '../models/group.model';
import { AppState, selectGroups } from '../reducers';
import { LoadGroups, LoadGroup, AddGroup, UpdateGroup, ConnectGroup, DeleteGroup, ClearGroups } from '../actions/group.actions';
import { selectAll, selectEntry } from '../reducers/group/group.reducer';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private endpoint: string = '/api/groups';

  selectGroups(): Observable<Group[]> {
    return this.store.pipe(
      select(selectGroups),
      select(selectAll)
    );
  }

  selectGroup(id: number): Observable<Group> {
    return this.store.pipe(
      select(selectGroups),
      select(selectEntry, id)
    );
  }

  constructor (private store: Store<AppState>, private http: HttpClient) {}

  getGroups() {
    this.store.dispatch(new ClearGroups());
    this.http.get<GetGroupsResponse>(this.endpoint).subscribe(
      response => this.store.dispatch(new LoadGroups({groups: response.groups})),
      error => console.log(error)
    );
  }

  createGroup(group: Group) {
    const request: GreateGroupRequest = {
      group: group
    };
    this.http.post<GreateGroupResponse>(this.endpoint, request).subscribe(
      response => this.store.dispatch(new AddGroup({group: {...group, id: response.id}})),
      error => console.log(error)
    );
  }

  getGroup(id: number) {
    this.http.get<GetGroupResponse>(`${this.endpoint}/${id}`).subscribe(
      response => this.store.dispatch(new LoadGroup({group: response.group})),
      error => console.log(error)
    );
  }

  updateGroup(group: Group) {
    const request: UpdateGroupRequest = {
      group: group
    };
    this.http.put<UpdateGroupResponse>(`${this.endpoint}/${request.group.id}`, request).subscribe(
      response => this.store.dispatch(new UpdateGroup({group: { id: group.id, changes: group }})),
      error => console.log(error)
    );
  }

  connectGroup(group: Group) {
    const request: ConnectGroupRequest = {
      group: group
    };
    this.http.post<ConnectGroupResponse>(`${this.endpoint}/${request.group.id}/connect`, request).subscribe(
      response => this.store.dispatch(new ConnectGroup({group: group})),
      error => console.log(error)
    );
  }

  leaveGroup(id: number) {
    this.http.delete<LeaveGroupResponse>(`${this.endpoint}/${id}`).subscribe(
      response => this.store.dispatch(new DeleteGroup({id: id})),
      error => console.log(error)
    );
  }
}

// requests
export interface GreateGroupRequest {
  group: Group;
}

export interface UpdateGroupRequest {
  group: Group;
}

export interface ConnectGroupRequest {
  group: Group;
}

// responses
export interface GetGroupsResponse {
  success: boolean;
  message: string;
  userId: number;
  groups: Group[];
}

export interface GreateGroupResponse {
  success: boolean;
  message: string;
  id: number;
}

export interface GetGroupResponse {
  success: boolean;
  message: string;
  userId: number;
  group: Group;
}

export interface UpdateGroupResponse {
  success: boolean;
  message: string;
}

export interface ConnectGroupResponse {
  success: boolean;
  message: string;
}

export interface LeaveGroupResponse {
  success: boolean;
  message: string;
}