import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  todayDate: Date;


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.todayDate = new Date();

  }


}

