import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {ListUserComponent} from './pages/list-user/list-user.component';
import {SharedModule} from '../../../shared';
import {CreateUserComponent} from './pages/create-user/create-user.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';

@NgModule({
  declarations: [
    ListUserComponent,
    CreateUserComponent,
    EditUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,

  ]
})
export class UsersModule {
}
