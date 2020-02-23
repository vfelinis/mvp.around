import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input() isMenuTrigger: boolean;
  @Input() menuName: string;
  @Input() text: string;
  @Input() action: any;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(): void {
    if (typeof this.action === 'function') {
      this.action();
    }
  }

}
