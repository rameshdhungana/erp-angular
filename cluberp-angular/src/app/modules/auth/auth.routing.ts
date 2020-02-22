import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {RedirectToDashboardGuard} from '../../core/guards/redirect-to-dashboard.guard';
import {VerifyPhoneComponent} from './pages/verify-phone/verify-phone.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {AuthGuard} from '../../core/guards';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'login',
        // canActivate: [RedirectToDashboardGuard],
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent
      },

      {
        path: 'verify-phone',
        component: VerifyPhoneComponent
      },
      {
        path: 'logout',
        canActivate: [AuthGuard],
        component: LogoutComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
