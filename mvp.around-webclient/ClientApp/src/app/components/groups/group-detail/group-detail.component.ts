import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map } from 'rxjs/operators';
import DG from '2gis-maps';
import * as workerTimers from 'worker-timers';
import 'leaflet.markercluster';

import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { User } from 'src/app/models/user.model';
import { GeolocationService } from 'src/app/services/geolocationService';
import { Geolocation } from 'src/app/models/geolocation.model';

import { UsersFilterPipe } from 'src/app/pipes/users-filter/users-filter.pipe';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailComponent implements OnInit, OnDestroy, OnChanges {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private markerTimer: any;
  private selectedUser: User;

  group$: Observable<Group>;
  group: Group;
  users$: Observable<User[]>;
  users: User[];
  geolocation: Geolocation;
  timer: any;
  timeout: number = 1000;
  map: any;
  markers: any = {};
  isMapShown: boolean;
  markersGroup: any = DG.markerClusterGroup();
  filter: string;

  constructor(private groupService: GroupService, private geolocationService: GeolocationService,
     private activatedRoute: ActivatedRoute)
  {
      this.group$ = this.groupService.selectGroup(+activatedRoute.snapshot.params['id']);
      this.group$.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(s => {
          this.group = s;
        });

      this.users$ = this.groupService.selectUsers(+activatedRoute.snapshot.params['id'], 30)
        .pipe(map(s => s.sort((a, b) => a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)));
      this.users$.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(s => {
          if (s.length > this.users?.length && s.length > 1) {
            this.sendHubMessage();
          }
          this.users = s;
        });

      this.geolocationService.selectGeolocation()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(s => {
          this.geolocation = s;
        });

      this.updateMarkers = this.updateMarkers.bind(this);
  }

  ngOnInit(): void {
    this.groupService.getGroup(+this.activatedRoute.snapshot.params['id']);
    this.sendHubMessage();
    this.map = DG.map('map', {
      'zoom': 15,
      'fullscreenControl': false
    });
    this.map.addLayer(this.markersGroup);
    //this.marker.addTo(this.map);
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
        lng: this.geolocation.lng,
        isGeolocationAvailable: this.geolocation.isAvailable,
        userIcon: this.group.userIcon
      }
      this.groupService.leaveHub(user);
    }
    if (this.timer) {
      workerTimers.clearTimeout(this.timer);
    }

    if (this.markerTimer) {
      clearTimeout(this.markerTimer);
    }
  }

  sendHubMessage() {
    if (this.group) {
      const user: User = {
        groupId: this.group.id,
        userName: this.group.userName,
        lat: this.geolocation.lat,
        lng: this.geolocation.lng,
        isGeolocationAvailable: this.geolocation.isAvailable,
        userIcon: this.group.userIcon
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

  onShowAllUsersOnMap() {
    this.isMapShown = true;
    this.map.setView([this.geolocation.lat, this.geolocation.lng]);
    this.updateMarkers(false);
  }

  onShowUserOnMap(user: User) {
    this.isMapShown = true;
    this.selectedUser = user;
    this.map.setView([user.lat, user.lng]);
    this.updateMarkers(true);
  }

  onCloseMap() {
    this.isMapShown = false;
    this.selectedUser = null;
    if (this.markerTimer) {
      clearTimeout(this.markerTimer);
    }
  }

  updateMarkers(onlySelected: boolean) {
    let users = this.users.filter(x => !onlySelected || x.userName === this.selectedUser?.userName);
    let actualMarkers = users.map(u => u.userName);
    let previousMarkers = Object.keys(this.markers);
    let markerNamesToDelete = previousMarkers.filter(x => !actualMarkers.includes(x));
    let markersToDelete = [];
    markerNamesToDelete.forEach(key => {
      markersToDelete.push(this.markers[key]);
      delete this.markers[key];
    });
    this.markersGroup.removeLayers(markersToDelete);
    let markersToAdd = [];
    users.forEach(user => {
      if (user.isGeolocationAvailable) {
        if (!previousMarkers.includes(user.userName)) {
          let options: any = {
            title: user.userName
          };
          if (user.userIcon) {
            options.icon = DG.icon({
              iconSize: [50, 50],
              className: 'icon',
              iconUrl: `/icons/${user.userIcon}.svg`,
            });
          }
          this.markers[user.userName] = DG.marker([user.lat, user.lng], options);
          this.markers[user.userName].bindPopup(`Nick name: ${user.userName}`);
          markersToAdd.push(this.markers[user.userName]);
        } else {
          this.markers[user.userName].setLatLng([user.lat, user.lng]);
        }
      }
    });
    this.markersGroup.addLayers(markersToAdd);

    this.markerTimer = setTimeout(() => {
      this.updateMarkers(onlySelected);
    }, 5000);
  }

  filterUsers(value: string) {
    this.filter = value;
  }

}
