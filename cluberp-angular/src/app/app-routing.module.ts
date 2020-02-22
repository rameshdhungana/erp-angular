import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {CONTENT_ROUTES} from './shared';

import {AuthGuard, NoAuthGuard} from './core/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
  //   children: CONTENT_ROUTES
  // },
  {
    path: 'auth',
    // component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  // Fallback when no prior routes is matched
  {path: '**', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

