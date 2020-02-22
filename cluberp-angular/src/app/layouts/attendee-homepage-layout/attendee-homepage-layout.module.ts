import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {AttendeeHomepageLayoutRoutingModule} from './attendee-homepage-layout-routing.module';
import {AttendeeHomepageLayoutComponent} from './attendee-homepage-layout.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AttendeeHomepageLayoutComponent
  ],
  imports: [
    CommonModule,
    AttendeeHomepageLayoutRoutingModule
  ]
})
export class AttendeeHomepageLayoutModule {
}
