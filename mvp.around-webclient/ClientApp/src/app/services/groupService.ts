import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '../models/group.model';
import { BaseResponse } from '../models/baseresponse.model';

@Injectable({
    providedIn: 'root'
  })
  export class GroupService {
    constructor (private http: HttpClient) {}
  
    getGroups() {
      return this.http.get<BaseResponse<Group[]>>('/api/groups');
    }
  }