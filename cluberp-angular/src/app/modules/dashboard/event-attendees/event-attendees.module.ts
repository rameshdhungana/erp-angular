import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventAttendeesRoutingModule} from './event-attendees-routing.module';
import {DashboardLayoutModule} from '../../../layouts/dashboard-layout/dashboard-layout.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventAttendeesRoutingModule,
    DashboardLayoutModule
  ]
})
export class EventAttendeesModule {
}
