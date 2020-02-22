import {RouterModule, Routes} from '@angular/router';
import {ListStaffComponent} from './pages/list-staff/list-staff.component';
import {AuthGuard} from '../../../core/guards';
import {CreateStaffComponent} from './pages/create-staff/create-staff.component';
import {EditStaffComponent} from './pages/edit-staff/edit-staff.component';
import {NgModule} from '@angular/core';
import {DetailStaffComponent} from './pages/detail-staff/detail-staff.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/staffs/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListStaffComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Staff List'
    }
  },
  {
    path: 'create',
    component: CreateStaffComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Staff Create'
    }
  },
  {
    path: 'edit/:staffUuid',
    component: EditStaffComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Staff Edit'
    }
  }
  ,
  {
    path: 'detail/:staffUuid',
    component: DetailStaffComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Staff Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule {
}
