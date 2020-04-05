import { Loader } from './../models/loader.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as signalR from "@microsoft/signalr";
import { HubConnection } from '@microsoft/signalr';

import { Group } from '../models/group.model';
import { AppState, selectGroups, selectUsers, selectLoader } from '../reducers';
import { LoadGroups, LoadGroup, AddGroup, UpdateGroup, ConnectGroup, DeleteGroup, ClearGroups } from '../actions/group.actions';
import { selectAll, selectEntry } from '../reducers/group/group.reducer';
import { UpsertUser, DeleteUser, ClearUsers } from '../actions/user.actions';
import { User } from '../models/user.model';
import { selectUsersForGroup } from '../reducers/user/user.reducer';
import { UpdateLoader } from '../actions/loader.actions';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor (private store: Store<AppState>, private http: HttpClient) {
    this.initHub();
  }

  private apiEndpoint: string = '/api/groups';
  private hubEndpoint: string = '/groupshub';
  private hubConnection: HubConnection | undefined;
  private user: User;

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

  selectUsers(groupId: number): Observable<User[]> {
    return this.store.pipe(
      select(selectUsers),
      select(selectUsersForGroup, groupId)
    );
  }

  selectLoader(): Observable<Loader> {
    return this.store.pipe(select(selectLoader));
  }

  getGroups() {
    this.store.dispatch(new ClearGroups());
    this.store.dispatch(new ClearUsers());
    this.store.dispatch(new UpdateLoader({isLoading: true}));
    this.http.get<GetGroupsResponse>(this.apiEndpoint).subscribe(
      response => {
        this.store.dispatch(new UpdateLoader({isLoading: false}));
        this.store.dispatch(new LoadGroups({groups: response.groups}));
      },
      error => {
        this.store.dispatch(new UpdateLoader({isLoading: false}));
        console.log(error);
      }
    );
  }

  createGroup(group: Group) {
    const request: GreateGroupRequest = {
      group: group
    };
    this.http.post<GreateGroupResponse>(this.apiEndpoint, request).subscribe(
      response => this.store.dispatch(new AddGroup({group: {...group, id: response.id}})),
      error => console.log(error)
    );
  }

  getGroup(id: number) {
    this.http.get<GetGroupResponse>(`${this.apiEndpoint}/${id}`).subscribe(
      response => {
        if (response.success) {
          this.store.dispatch(new LoadGroup({group: response.group}));
        }
      },
      error => console.log(error)
    );
  }

  updateGroup(group: Group) {
    const request: UpdateGroupRequest = {
      group: group
    };
    this.http.put<UpdateGroupResponse>(`${this.apiEndpoint}/${request.group.id}`, request).subscribe(
      response => {
        if (response.success) {
          this.store.dispatch(new UpdateGroup({group: { id: group.id, changes: group }}));
        }
      },
      error => console.log(error)
    );
  }

  connectGroup(group: Group) {
    const request: ConnectGroupRequest = {
      group: group
    };
    this.http.post<ConnectGroupResponse>(`${this.apiEndpoint}/${request.group.id}/connect`, request).subscribe(
      response => {
        if (response.success) {
          this.store.dispatch(new ConnectGroup({group: group}));
        }
      },
      error => console.log(error)
    );
  }

  leaveGroup(id: number) {
    this.http.delete<LeaveGroupResponse>(`${this.apiEndpoint}/${id}`).subscribe(
      response => this.store.dispatch(new DeleteGroup({id: id})),
      error => console.log(error)
    );
  }

  sendHubMessage(message: User): void {
    this.user = message;
    if (this.hubConnection) {
        this.hubConnection.invoke('Send', message);
    }
  }

  joinHub(message: User): void {
    this.user = message;
    if (this.hubConnection) {
        this.hubConnection.invoke('JoinHub', message);
    }
  }

  leaveHub(message: User): void {
    this.user = message;
    if (this.hubConnection) {
        this.hubConnection.invoke('LeaveHub', message);
    }
  }

  private initHub() {
    this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubEndpoint)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));

    this.hubConnection.on('Send', (message: User) => {
        this.store.dispatch(new UpsertUser({user: message}));
    });

    this.hubConnection.on('JoinHub', (message: User) => {
      this.store.dispatch(new UpsertUser({user: message}));
    });

    this.hubConnection.on('LeaveHub', (message: User) => {
      this.store.dispatch(new DeleteUser({user: message}));
    });
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

export interface GroupsHubMessage {
  groupId: number;
  userName: string;
  lat: number;
  lng: number;
}