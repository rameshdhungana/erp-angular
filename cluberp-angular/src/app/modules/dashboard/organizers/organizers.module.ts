import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateOrganizerComponent} from './pages/create-organizer/create-organizer.component';
import {ListOrganizerComponent} from './pages/list-organizer/list-organizer.component';
import {DetailOrganizerComponent} from './pages/detail-organizer/detail-organizer.component';
import {SharedModule} from '../../../shared';
import {OrganizersRoutingModule} from './organizers-routing.module';

@NgModule({
  declarations: [
    CreateOrganizerComponent,
    ListOrganizerComponent,
    DetailOrganizerComponent
  ],
  imports: [
    CommonModule,
    OrganizersRoutingModule,
    SharedModule
  ]
})
export class OrganizersModule {
}
