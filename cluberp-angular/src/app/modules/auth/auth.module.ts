import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {SharedModule} from '../../shared';

import {AuthRoutingModule} from './auth.routing';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {AlertService} from '../../shared/services/alert.service';
import { VerifyPhoneComponent } from './pages/verify-phone/verify-phone.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyPhoneComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
  ],
  providers: [
    AlertService

  ]
})
export class AuthModule {
}
