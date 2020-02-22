import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared';
import {OrderLoginComponent} from './pages/order-login/order-login.component';
import {OrderEditionRoutingModule} from './order-edition-routing.module';
import {OrderEditComponent} from './pages/order-edit/order-edit.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {OrderEditSummaryComponent} from './pages/order-edit-summary/order-edit-summary.component';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    OrderLoginComponent,
    OrderEditComponent,
    OrderEditSummaryComponent,
  ],
  imports: [
    CommonModule,
    OrderEditionRoutingModule,
    SharedModule,
    NgxIntlTelInputModule,
    TabsModule.forRoot()

  ]
})
export class OrderEditionModule {
}
