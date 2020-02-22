import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEventCategoryComponent} from '../event-categories/pages/list-event-category/list-event-category.component';
import {AuthGuard} from '../../../core/guards';
import {CreateEventTypeComponent} from './pages/create-event-type/create-event-type.component';
import {DetailEditTypeComponent} from './pages/detail-edit-type/detail-edit-type.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'event-types/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEventCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event  Type '
    }
  },
  {
    path: 'create',
    component: CreateEventTypeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Type Create'
    }
  },

  {
    path: 'detail/:eventTypeUuid',
    component: DetailEditTypeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Type Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTypesRoutingModule {
}
