import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPermissionsRoutingModule} from './group-permissions-routing.module';
import {CreateGroupComponent} from './pages/create-group/create-group.component';
import {ListGroupComponent} from './pages/list-group/list-group.component';
import {EditGroupComponent} from './pages/edit-group/edit-group.component';
import {SharedModule} from '../../../shared';
import { DetailGroupComponent } from './pages/detail-group/detail-group.component';

@NgModule({
  declarations: [
    CreateGroupComponent,
    ListGroupComponent,
    EditGroupComponent,
    DetailGroupComponent
  ],
  imports: [
    CommonModule,
    GroupPermissionsRoutingModule,
    SharedModule,

  ]
})
export class GroupPermissionsModule {
}
