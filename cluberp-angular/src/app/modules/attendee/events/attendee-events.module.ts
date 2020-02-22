import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventListComponent} from './pages/event-list/event-list.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {RegisterEventComponent} from './pages/register-event/register-event.component';
import {AttendeeEventsRoutingModule} from './attendee-events-routing.module';
import {SharedModule} from '../../../shared';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {PaginationModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent,
    RegisterEventComponent,
  ],
  imports: [
    CommonModule,
    AttendeeEventsRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),

  ]
})
export class AttendeeEventsModule {
}

