import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardLayoutRoutingModule} from './dashboard-layout-routing.module';
import {SideBarComponent} from './side-bar/side-bar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {DashboardLayoutComponent} from './dashboard-layout.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    CommonModule,
    DashboardLayoutRoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()


  ],
  exports: [
    PaginationModule,
    BsDropdownModule


  ],
})

export class DashboardLayoutModule {
}
