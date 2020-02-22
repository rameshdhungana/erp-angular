import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRegistrationRoutingModule} from './event-registration-routing.module';
import {RegisterPersonnelDetailComponent} from './pages/register-personnel-detail/register-personnel-detail.component';
import {SharedModule} from '../../../shared';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {BookTransportationComponent} from './pages/book-transportation/book-transportation.component';
import {BookAccommodationComponent} from './pages/book-accommodation/book-accommodation.component';
import {ViewCartSummaryComponent} from './pages/view-cart-summary/view-cart-summary.component';
import {ViewOrderSummaryComponent} from './pages/view-order-summary/view-order-summary.component';
import {ChooseAccommodationTypeComponent} from './pages/choose-accommodation-type/choose-accommodation-type.component';


@NgModule({
  declarations: [
    RegisterPersonnelDetailComponent,
    BookTransportationComponent,
    BookAccommodationComponent,
    ViewCartSummaryComponent,
    ViewOrderSummaryComponent,
    ChooseAccommodationTypeComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxIntlTelInputModule,
    EventRegistrationRoutingModule,


  ],

})
export class EventRegistrationModule {
}

