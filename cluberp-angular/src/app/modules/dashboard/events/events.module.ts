import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsRoutingModule} from './events-routing.module';
import {ListEventComponent} from './pages/list-event/list-event.component';
import {CreateEventComponent} from './pages/create-event/create-event.component';
import {DetailEventComponent} from './pages/detail-event/detail-event.component';
import {SharedModule} from '../../../shared';
import {ListDebitorComponent} from '../event-attendees/page/list-debitor/list-debitor.component';
import {ListCreditorComponent} from '../event-attendees/page/list-creditor/list-creditor.component';
import {ListEventAttendeeComponent} from '../event-attendees/page/list-event-attendee/list-event-attendee.component';
import {DashboardLayoutModule} from '../../../layouts/dashboard-layout/dashboard-layout.module';
import {ListRefundComponent} from '../order-items/pages/list-refund/list-refund.component';
import {ListReceiptComponent} from '../order-items/pages/list-receipt/list-receipt.component';
import {ListTransportationItemsComponent} from '../event-items/pages/list-transportation-items/list-transportation-items.component';
import {ListAccommodationItemsComponent} from '../event-items/pages/list-accommodation-items/list-accommodation-items.component';
import {ListRegistrationItemsComponent} from '../event-items/pages/list-registration-items/list-registration-items.component';
import {DetailAccommodationItemComponent} from '../event-items/pages/detail-accommodation-item/detail-accommodation-item.component';
import {TabsModule} from 'ngx-bootstrap';
import {ListArrivalDepartureReportComponent} from '../order-items/pages/list-arrival-departure-report/list-arrival-departure-report.component';
import {DetailTransportationItemComponent} from '../event-items/pages/detail-transportation-item/detail-transportation-item.component';


@NgModule({
  declarations: [ListEventComponent,
    CreateEventComponent,
    DetailEventComponent,
    ListDebitorComponent,
    ListCreditorComponent,
    ListEventAttendeeComponent,
    ListRefundComponent,
    ListReceiptComponent,
    ListTransportationItemsComponent,
    ListAccommodationItemsComponent,
    ListRegistrationItemsComponent,
    DetailAccommodationItemComponent,
    ListArrivalDepartureReportComponent,
    DetailTransportationItemComponent


  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    DashboardLayoutModule,
    TabsModule.forRoot()

  ]
})
export class EventsModule {
}
