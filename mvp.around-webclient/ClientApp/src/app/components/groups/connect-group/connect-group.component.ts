import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Group, Role } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/groupService';
import { getIconNames } from 'src/app/utils/icons';

@Component({
  selector: 'app-connect-group',
  templateUrl: './connect-group.component.html',
  styleUrls: ['./connect-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectGroupComponent implements OnInit {
  public connectForm: FormGroup;
  public id: FormControl;
  public label: FormControl;
  public password: FormControl;
  public userName: FormControl;
  public userIcon: FormControl;

  public icons: string[] = getIconNames();

  constructor(private service: GroupService,
    private dialogRef: MatDialogRef<ConnectGroupComponent>
  ) {
    this.id = new FormControl('', [Validators.required]);
    this.label = new FormControl('', [Validators.required]);
    this.password = new FormControl('');
    this.userName = new FormControl('', [Validators.required]);
    this.userIcon = new FormControl('', [Validators.required]);
    this.connectForm = new FormGroup({
      id: this.id,
      label: this.label,
      password: this.password,
      userName: this.userName,
      icon: this.userIcon
    });
  }

  ngOnInit(): void {
  }

  getIdMessage() {
    return this.label.hasError('required') ? 'You must enter a value' : '';
  }

  getLabelMessage() {
    return this.label.hasError('required') ? 'You must enter a value' : '';
  }

  getUserNamedMessage() {
    return this.userName.hasError('required')
            ? 'You must enter a value'
            : '';
  }

  getIconMessage() {
    return this.userIcon.hasError('required') ? 'You must select an icon' : '';
  }

  submit() {
    if (this.connectForm.status === 'VALID') {
      const newGroup: Group = {
        id: this.id.value,
        label: this.label.value,
        password: this.password.value,
        userName: this.userName.value,
        userRole: Role.User,
        userIcon: this.userIcon.value
      };
      this.service.connectGroup(newGroup);
      this.dialogRef.close();
    }
  }
}
