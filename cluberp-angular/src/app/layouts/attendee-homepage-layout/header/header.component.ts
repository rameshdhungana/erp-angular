import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  userIsLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
