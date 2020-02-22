import {Component, OnInit} from '@angular/core';
import {GroupPermissionService} from '../../../../../core/services/auth/group-permission.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  groupList: Array<any>;

  constructor(
    private groupService: GroupPermissionService
  ) {
  }

  ngOnInit() {
    this.groupService.getGroupList().subscribe(response => {
      this.groupList = response['data'];
    });
  }

}
