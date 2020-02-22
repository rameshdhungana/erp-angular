import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEventComponent} from './pages/list-event/list-event.component';
import {AuthGuard} from '../../../core/guards';
import {CreateEventComponent} from './pages/create-event/create-event.component';
import {DetailEventComponent} from './pages/detail-event/detail-event.component';
import {ListEventAttendeeComponent} from '../event-attendees/page/list-event-attendee/list-event-attendee.component';
import {ListDebitorComponent} from '../event-attendees/page/list-debitor/list-debitor.component';
import {ListCreditorComponent} from '../event-attendees/page/list-creditor/list-creditor.component';
import {ListRefundComponent} from '../order-items/pages/list-refund/list-refund.component';
import {ListReceiptComponent} from '../order-items/pages/list-receipt/list-receipt.component';
import {ListTransportationItemsComponent} from '../event-items/pages/list-transportation-items/list-transportation-items.component';
import {ListAccommodationItemsComponent} from '../event-items/pages/list-accommodation-items/list-accommodation-items.component';
import {ListRegistrationItemsComponent} from '../event-items/pages/list-registration-items/list-registration-items.component';
import {DetailAccommodationItemComponent} from '../event-items/pages/detail-accommodation-item/detail-accommodation-item.component';
import {DetailTransportationItemComponent} from '../event-items/pages/detail-transportation-item/detail-transportation-item.component';
import {ListArrivalDepartureReportComponent} from '../order-items/pages/list-arrival-departure-report/list-arrival-departure-report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/events/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEventComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event List'
    }
  },
  {
    path: 'create',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Create'
    }
  },
  {
    path: ':eventUuid',
    component: DetailEventComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Detail'
    }
  },
  {
    path: ':eventUuid/edit',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Detail'
    }
  },
  {
    path: ':eventUuid/attendees',
    component: ListEventAttendeeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Attendees List'
    }
  },
  {
    path: ':eventUuid/debitors',
    component: ListDebitorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/creditors',
    component: ListCreditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/refund-list',
    component: ListRefundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/receipt-list',
    component: ListReceiptComponent,
    canActivate: [AuthGuard],
  },

//   event items related path
  {
    path: ':eventUuid/transportation-items',
    component: ListTransportationItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/accommodation-items',
    component: ListAccommodationItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/registration-items',
    component: ListRegistrationItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/accommodation-items/:eventItemUuid',
    component: DetailAccommodationItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/transportation-items/:eventItemUuid',
    component: DetailTransportationItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':eventUuid/arrival-departure-report',
    component: ListArrivalDepartureReportComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
