import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPersonnelDetailComponent} from './pages/register-personnel-detail/register-personnel-detail.component';
import {BookTransportationComponent} from './pages/book-transportation/book-transportation.component';
import {BookAccommodationComponent} from './pages/book-accommodation/book-accommodation.component';
import {ViewCartSummaryComponent} from './pages/view-cart-summary/view-cart-summary.component';
import {ChooseAccommodationTypeComponent} from './pages/choose-accommodation-type/choose-accommodation-type.component';

const routes: Routes = [
  {
    path: 'personnel-detail/:eventUuid',
    component: RegisterPersonnelDetailComponent,
    data: {
      title: 'Personnel Detail'
    }
  },
  {
    path: 'accommodation-type/:eventUuid/:attendeeUuid',
    component: ChooseAccommodationTypeComponent,
    data: {
      title: 'Accommodation Type'
    }
  },
  {
    path: 'accommodation/:eventUuid/:attendeeUuid',
    component: BookAccommodationComponent,
    data: {
      title: 'Book Accommodation'
    }
  },
  {
    path: 'transportation/:eventUuid/:attendeeUuid',
    component: BookTransportationComponent,
    data: {
      title: 'Book Transportation'
    }
  },
  {
    path: 'cart-summary/:eventUuid/:attendeeUuid',
    component: ViewCartSummaryComponent,
    data: {
      title: 'Cart Summary'
    }
  },


  // {
  //   path: '/:eventUuid',
  //   component: EventDetailComponent,
  //   data: {
  //     title: 'Event Detail'
  //   }
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRegistrationRoutingModule {
}

