import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guards';
import {ListOrganizerComponent} from './pages/list-organizer/list-organizer.component';
import {CreateOrganizerComponent} from './pages/create-organizer/create-organizer.component';
import {DetailOrganizerComponent} from './pages/detail-organizer/detail-organizer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'organizers/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListOrganizerComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event  Categories '
    }
  },
  {
    path: 'create',
    component: CreateOrganizerComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Event Category Create'
    }
  },

  {
    path: 'detail/:eventCatUuid',
    component: DetailOrganizerComponent,
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
export class OrganizersRoutingModule {
}
