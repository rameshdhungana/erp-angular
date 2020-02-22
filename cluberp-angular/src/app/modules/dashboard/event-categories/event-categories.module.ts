import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateEventCategoryComponent} from './pages/create-event-category/create-event-category.component';
import {DetailEventCategoryComponent} from './pages/detail-event-category/detail-event-category.component';
import {ListEventCategoryComponent} from './pages/list-event-category/list-event-category.component';
import {EventCategoriesRoutingModule} from './event-categories-routing.module';
import {SharedModule} from '../../../shared';
import {DashboardLayoutModule} from '../../../layouts/dashboard-layout/dashboard-layout.module';

@NgModule({
  declarations: [
    CreateEventCategoryComponent,
    DetailEventCategoryComponent,
    ListEventCategoryComponent
  ],
  imports: [
    CommonModule,
    EventCategoriesRoutingModule,
    SharedModule,
    DashboardLayoutModule
  ]
})
export class EventCategoriesModule {
}

