import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListEventComponent} from '../events/pages/list-event/list-event.component';
import {AuthGuard} from '../../../core/guards';

import {ListEventCategoryComponent} from './pages/list-event-category/list-event-category.component';
import {CreateEventCategoryComponent} from './pages/create-event-category/create-event-category.component';
import {DetailEventCategoryComponent} from './pages/detail-event-category/detail-event-category.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'event-categories/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEventCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event  Categories '
    }
  },
  {
    path: 'create',
    component: CreateEventCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Category Create'
    }
  },

  {
    path: 'detail/:eventCatUuid',
    component: DetailEventCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Category Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventCategoriesRoutingModule {
}
