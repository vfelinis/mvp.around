import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Group } from 'src/app/models/group.model';
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

  constructor(private store: Store<AppState>,
    private dialogRef: MatDialogRef<NewGroupComponent>
  ) {
    this.label = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.pattern('.{8,}')]);
    this.createForm = new FormGroup({
      label: this.label,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  getLabelMessage() {
    return this.label.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordMessage() {
    return this.password.hasError('required') || this.password.hasError('pattern')
            ? 'You must enter eight or more characters'
            : '';
  }

  submit() {
    if (this.createForm.status === 'VALID') {
      const newGroup: Group = {
        id: 1 + Math.floor((1000 - 1) * Math.random()),
        label: this.label.value,
        password: this.password.value
      };
      this.store.dispatch(new AddGroup({group: newGroup}));
      this.dialogRef.close();
    }
  }

}
