import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guards';
import {ListEventAttendeeComponent} from './page/list-event-attendee/list-event-attendee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'attendees/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEventAttendeeComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventAttendeesRoutingModule {
}
