import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Group, Role } from 'src/app/models/group.model';
import { ConfirmDialogData, ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group = null;
  @Output() onSave = new EventEmitter<Group>();
  @Output() onLeave = new EventEmitter<number>();

  public label: FormControl;
  public password: FormControl;
  public userName: FormControl;

  public showPassword: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.label = new FormControl(this.group.label, [Validators.required]);
    this.password = new FormControl(this.group.password);
    this.userName = new FormControl(this.group.userName, [Validators.required]);
    this.showPassword = this.group.userRole == Role.Owner;
  }

  getLabelMessage() {
    return this.label.hasError('required') ? 'You must enter a value' : '';
  }

  getUserNamedMessage() {
    return this.userName.hasError('required')
            ? 'You must enter a value'
            : '';
  }

  notNeedSave() {
    return this.group.label === this.label.value
      && this.group.password === this.password.value
      && this.group.userName === this.userName.value;
  }

  save(): void {
    if (!this.label.invalid && !this.userName.invalid) {
      const updatedGroup: Group = {
        id: this.group.id,
        label: this.label.value,
        password: this.password.value,
        userName: this.userName.value,
        userRole: this.group.userRole
      };
      this.onSave.emit(updatedGroup);
    }
  }

  leave(): void {
    const dialogData: ConfirmDialogData = {
      title: `Leave the group ${this.group.id} (${this.group.label})`,
      content: 'Are you sure?'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.onLeave.emit(this.group.id);
      }
    });
  }

}
