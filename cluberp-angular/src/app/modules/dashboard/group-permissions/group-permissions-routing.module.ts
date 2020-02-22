import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListGroupComponent} from './pages/list-group/list-group.component';
import {AuthGuard} from '../../../core/guards';
import {CreateGroupComponent} from './pages/create-group/create-group.component';
import {EditGroupComponent} from './pages/edit-group/edit-group.component';
import {RouterModule, Routes} from '@angular/router';
import {DetailGroupComponent} from './pages/detail-group/detail-group.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/groups/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListGroupComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Group List'
    }
  },
  {
    path: 'create',
    component: CreateGroupComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Group Create'
    }
  },
  {
    path: 'edit/:groupId',
    component: EditGroupComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Group Edit'
    }
  },
  {
    path: 'detail/:groupId',
    component: DetailGroupComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Group Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPermissionsRoutingModule {
}
