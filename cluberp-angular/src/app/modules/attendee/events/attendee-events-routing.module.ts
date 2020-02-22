import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventListComponent} from './pages/event-list/event-list.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {AuthGuard} from '../../../core/guards';


const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
    data: {
      title: 'Events'
    }
  },

  {
    path: 'detail/:eventUuid',
    component: EventDetailComponent,
    data: {
      title: 'Event Detail'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendeeEventsRoutingModule {
}
