import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Group, Role } from 'src/app/models/group.model';
import { AppState } from 'src/app/reducers';
import { AddGroup } from 'src/app/actions/group.actions';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGroupComponent implements OnInit {
  public createForm: FormGroup;
  public label: FormControl;
  public password: FormControl;
  public userName: FormControl;

  constructor(private store: Store<AppState>,
    private dialogRef: MatDialogRef<NewGroupComponent>
  ) {
    this.label = new FormControl('', [Validators.required]);
    this.password = new FormControl('');
    this.userName = new FormControl('', [Validators.required]);
    this.createForm = new FormGroup({
      label: this.label,
      password: this.password,
      userName: this.userName
    });
  }

  ngOnInit(): void {
  }

  getLabelMessage() {
    return this.label.hasError('required') ? 'You must enter a value' : '';
  }

  getUserNamedMessage() {
    return this.userName.hasError('required')
            ? 'You must enter a value'
            : '';
  }

  submit() {
    if (this.createForm.status === 'VALID') {
      const newGroup: Group = {
        id: 0,
        label: this.label.value,
        password: this.password.value,
        userName: this.userName.value,
        userRole: Role.Owner
      };
      this.store.dispatch(new AddGroup({group: newGroup}));
      this.dialogRef.close();
    }
  }

}
