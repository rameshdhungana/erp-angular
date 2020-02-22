import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared';
import {ListStaffComponent} from './pages/list-staff/list-staff.component';
import {CreateStaffComponent} from './pages/create-staff/create-staff.component';
import {EditStaffComponent} from './pages/edit-staff/edit-staff.component';
import {StaffsRoutingModule} from './staffs-routing.module';
import { DetailStaffComponent } from './pages/detail-staff/detail-staff.component';

@NgModule({
  declarations: [
    ListStaffComponent,
    CreateStaffComponent,
    EditStaffComponent,
    DetailStaffComponent
  ],
  imports: [
    CommonModule,
    StaffsRoutingModule,
    SharedModule,

  ]
})
export class StaffsModule {
}
