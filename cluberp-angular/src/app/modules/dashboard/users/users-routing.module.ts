import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guards';
import {ListUserComponent} from './pages/list-user/list-user.component';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';
import {DetailUserComponent} from './pages/detail-user/detail-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListUserComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User List'
    }
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User Create'
    }
  },
  {
    path: 'edit/:userUuid',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User List'
    }
  },
  {
    path: 'detail/:userUuid',
    component: DetailUserComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
