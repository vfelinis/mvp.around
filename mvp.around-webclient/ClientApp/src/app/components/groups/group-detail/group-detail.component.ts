import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import DG from '2gis-maps';
import * as workerTimers from 'worker-timers';

import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { User } from 'src/app/models/user.model';
import { GeolocationService } from 'src/app/services/geolocationService';
import { Geolocation } from 'src/app/models/geolocation.model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailComponent implements OnInit, OnDestroy, OnChanges {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  group$: Observable<Group>;
  group: Group;
  users$: Observable<User[]>;
  users: User[];
  geolocation: Geolocation;
  timer: any;
  timeout: number = 1000;
  map: any;
  marker: any = DG.marker([0, 0]);
  isMapShown: boolean;

  constructor(private groupService: GroupService, private geolocationService: GeolocationService,
     private activatedRoute: ActivatedRoute)
  {
    this.group$ = this.groupService.selectGroup(+activatedRoute.snapshot.params['id']);
    this.group$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.group = s;
      });

    this.users$ = this.groupService.selectUsers(+activatedRoute.snapshot.params['id']);
    this.users$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.users = s;
      });

    this.geolocationService.selectGeolocation()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.geolocation = s;
      });
  }

  ngOnInit(): void {
    this.groupService.getGroup(+this.activatedRoute.snapshot.params['id']);
    this.sendHubMessage();
    this.map = DG.map('map', {
      'zoom': 15,
      'fullscreenControl': false
    });
    this.marker.addTo(this.map);
    // this.map.locate({setView: true, watch: true})
    //     .on('locationfound', (e) => {
    //       this.marker.setLatLng([e.latitude, e.longitude]);
    //     })
    //     .on('locationerror', (e) => {
    //       DG.popup()
    //         .setLatLng(this.map.getCenter())
          
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (let propName in changes) {
    //   if (propName === 'users' && this.group) {
    //     let chng = changes[propName];
    //     let cur  = chng.currentValue as User[];
    //     let prev = chng.previousValue as User[];
    //     cur = cur.filter(s => s.groupId !== this.group.id && s.userName !== this.group.userName);
    //     prev = prev.filter(s => s.groupId !== this.group.id && s.userName !== this.group.userName);
    //     if (cur.length > prev.length) {
    //       const user: User = {
    //         groupId: this.group.id,
    //         userName: this.group.userName,
    //         lat: this.geolocation.lat,
    //         lng: this.geolocation.lng
    //       }
    //       this.groupService.sendHubMessage(user);
    //     }
    //   }
    // }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.group) {
      const user: User = {
        groupId: this.group.id,
        userName: this.group.userName,
        lat: this.geolocation.lat,
        lng: this.geolocation.lng
      }
      this.groupService.leaveHub(user);
    }
    if (this.timer) {
      workerTimers.clearTimeout(this.timer);
    }
  }

  sendHubMessage() {
    if (this.group) {
      const user: User = {
        groupId: this.group.id,
        userName: this.group.userName,
        lat: this.geolocation.lat,
        lng: this.geolocation.lng
      }
      if (!this.users.length) {
        this.groupService.joinHub(user);
      } else {
        this.timeout = 15000;
        this.groupService.sendHubMessage(user);
      }
    }
    this.timer = workerTimers.setTimeout(() => {
      this.sendHubMessage();
    }, this.timeout);
  }

  onShowMap(user: User) {
    this.isMapShown = true;
    this.marker.setLatLng([user.lat, user.lng]);
    this.map.setView([user.lat, user.lng]);
  }

  onCloseMap() {
    this.isMapShown = false;
  }

}
