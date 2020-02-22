import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CoreModule} from './core';
import {SharedModule} from './shared';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {AuthModule} from './modules/auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardLayoutModule} from './layouts/dashboard-layout/dashboard-layout.module';
import {AttendeeHomepageLayoutModule} from './layouts/attendee-homepage-layout/attendee-homepage-layout.module';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,


    // other separate modules  for lazy loading
    AuthModule,
    DashboardLayoutModule,
    AttendeeHomepageLayoutModule,


    // core & shared
    CoreModule,
    SharedModule,


    // app
    AppRoutingModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
