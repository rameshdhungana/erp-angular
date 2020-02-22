import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './dashboard-layout.component';


const routes: Routes = [

  {
    path: 'dashboard',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {path: 'dashboard', loadChildren: '../../modules/dashboard/main-content/main-content.module#MainContentModule', data: {a: 'das'}},
      {
        path: 'groups',
        loadChildren: '../../modules/dashboard/group-permissions/group-permissions.module#GroupPermissionsModule',
        data: {a: 'grp'}
      },
      {path: 'users', loadChildren: '../../modules/dashboard/users/users.module#UsersModule', data: {a: 'usr'}},
      {path: 'staffs', loadChildren: '../../modules/dashboard/staffs/staffs.module#StaffsModule', data: {a: 'stf'}},
      {path: 'attendees', loadChildren: '../../modules/dashboard/event-attendees/event-attendees.module#EventAttendeesModule'},
      {path: 'admin/events', loadChildren: '../../modules/dashboard/events/events.module#EventsModule', data: {a: 'admin-events'}},
      {
        path: 'organizers',
        loadChildren: '../../modules/dashboard/organizers/organizers.module#OrganizersModule'
      },
      {path: 'event-types', loadChildren: '../../modules/dashboard/event-types/event-types.module#EventTypesModule'},
      // {
      //   path: 'event-categories',
      //   loadChildren: '../../modules/dashboard/event-categories/event-categories.module.ts#EventCategoriesModule'
      //
      // },
      {
        path: 'configurations',
        loadChildren: '../../modules/dashboard/configurations/configurations.module#ConfigurationsModule',
        data: {a: 'admin-configurations'}
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule {
}
