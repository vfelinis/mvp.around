import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class GroupService {
    constructor (private http: HttpClient) {}
  
    getGroups() {
      return this.http.get('/api/groups');
    }
  }