import {Component, OnInit} from '@angular/core';
import {GroupPermissionService} from '../../../../../core/services/auth/group-permission.service';
import {NgForm} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  permissionList: Array<object>;
  perms: [];
  selectedPermissionList = [];
  // groupPermissionForm: FormGroup;
  loading = true;

  constructor(private groupService: GroupPermissionService,
              private alertService: AlertService
  ) {
  }


  ngOnInit() {

    this.groupService.getPermissionList().subscribe((response) => {
      this.permissionList = response['data'];
      this.loading = false;

    });
  }

  updateSelectedPermissionList(checked, permission_id) {
    // this pushes the permission id to selected list only if value is checked and not already included
    const index = this.selectedPermissionList.indexOf(permission_id);
    if (index < 0) {
      if (checked) {
        this.selectedPermissionList.push(permission_id);
      }

    } else {
      this.selectedPermissionList.splice(index, 1);
    }

  }

  createGroup(data: NgForm) {
    if (data.valid) {

      // for (let i=0)
      if (this.selectedPermissionList.length < 1) {

        this.alertService.error('At least a permission must be selected');

      } else {
        const postData = {
          'name': data.value.name,
          'permissions': this.selectedPermissionList
        };
        this.groupService.createGroupWithPermissions(postData).subscribe(
          response => {
            this.alertService.success('A group has been created successfully');

            this.groupService.getGroupList();

          }
        );
      }


    }
  }
}

//
// buildForm() {
//   this.groupPermissionForm = this.formBuilder.group({
//     name: ['', Validators.required],
//     permissions: [this.formBuilder.array([this.createArrayOfPermissionCheckBox()]), Validators.required]
//   });
//   this.loading = false;
//
// }
//
// createArrayOfPermissionCheckBox() {
//   for (let i = 0; i < 20; i++) {
//     this.addPermissionForm();
//
//   }
// }
//
// // this is getter  for accessing formArray of permissions fields in form group
// get permissionArrayForm() {
//   return this.groupPermissionForm.get('permissions') as FormArray;
// }
//
// // this is to add the form-control to array field of permissions
// addPermissionForm() {
//   this.permissionArrayForm.push(this.formBuilder.control(''));
// }
