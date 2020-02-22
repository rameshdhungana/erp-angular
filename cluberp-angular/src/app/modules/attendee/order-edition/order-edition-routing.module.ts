import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderLoginComponent} from './pages/order-login/order-login.component';
import {OrderEditComponent} from './pages/order-edit/order-edit.component';
import {OrderLoginGuard} from '../../../core/guards/order-login.guard';
import {OrderEditSummaryComponent} from './pages/order-edit-summary/order-edit-summary.component';
import {ViewOrderSummaryComponent} from '../event-registration/pages/view-order-summary/view-order-summary.component';
import {AuthGuard} from '../../../core/guards';


const routes: Routes = [
  {
    path: 'login/:eventUuid',
    component: OrderLoginComponent,
    data: {
      title: 'Order Login'
    }
  },

  {
    path: 'edit/:eventUuid/:attendeeUuid',
    component: OrderEditComponent,
    canActivate: [OrderLoginGuard],
    data: {
      title: 'Order Detail'

    }
  },
  {
    path: 'edit-summary/:eventUuid/:attendeeUuid',
    component: OrderEditSummaryComponent,
    canActivate: [OrderLoginGuard],
    data: {
      title: 'Order Edit Summary'

    }
  },
  {
    path: 'summary/:eventUuid/:attendeeUuid',
    component: ViewOrderSummaryComponent,
    data: {
      title: 'Order Summary'
    }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderEditionRoutingModule {
}
