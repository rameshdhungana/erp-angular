import {NgModule} from '@angular/core';
import {AttendeeHomepageLayoutComponent} from './attendee-homepage-layout.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: AttendeeHomepageLayoutComponent,
    children: [
      {path: 'events', loadChildren: '../../modules/attendee/events/attendee-events.module#AttendeeEventsModule'},
      {
        path: 'events/registration',
        loadChildren: '../../modules/attendee/event-registration/event-registration.module#EventRegistrationModule'
      },
      {
        path: 'events/order',
        loadChildren: '../../modules/attendee/order-edition/order-edition.module#OrderEditionModule'
      },


    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeeHomepageLayoutRoutingModule {
}


