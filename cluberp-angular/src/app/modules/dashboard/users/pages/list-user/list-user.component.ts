import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../core/services/auth/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  userList: Array<object> = [];

  constructor(private userService: UserService) {
  }


  ngOnInit() {
    this.userService.getUserList().subscribe(response => {
      this.userList = response['data'];
    });
  }


}
