import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private endpoint: string = '/api/groups';

  constructor (private http: HttpClient) {}

  getGroups() {
    return this.http.get<GetGroupsResponse>(this.endpoint);
  }

  createGroup(request: GreateGroupRequest) {
    return this.http.post<GreateGroupResponse>(this.endpoint, request);
  }

  GetGroup(id: number) {
    return this.http.get<GetGroupResponse>(`${this.endpoint}/${id}`);
  }

  UpdateGroup(request: UpdateGroupRequest) {
    return this.http.put<UpdateGroupResponse>(`${this.endpoint}/${request.group.id}`, request);
  }

  ConnectGroup(request: ConnectGroupRequest) {
    return this.http.post<ConnectGroupResponse>(`${this.endpoint}/${request.group.id}/connect`, request);
  }

  LeaveGroup(id: number) {
    return this.http.delete<LeaveGroupResponse>(`${this.endpoint}/${id}`);
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