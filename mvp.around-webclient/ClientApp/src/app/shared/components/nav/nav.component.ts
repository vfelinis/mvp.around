import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.loggedIn$ = this.authService.selectloggedIn();
   }

  ngOnInit(): void {
  }

  signinPopup(): void {
    this.authService.signinPopup();
  }

  signoutPopup(): void {
    this.authService.signoutPopup();
  }

}
