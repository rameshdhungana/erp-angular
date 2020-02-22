import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/guards';
import {ListConfigurationComponent} from './pages/list-configuration/list-configuration.component';
import {CreateConfigurationComponent} from './pages/create-configuration/create-configuration.component';
import {EditConfigurationComponent} from './pages/edit-configuration/edit-configuration.component';
import {DetailConfigurationComponent} from './pages/detail-configuration/detail-configuration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/configurations/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListConfigurationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Configurations List'
    }
  },
  {
    path: 'create',
    component: CreateConfigurationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Configuration Create'
    }
  },
  {
    path: 'edit/:configurationUuid',
    component: EditConfigurationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Configuration Edit'
    }
  },
  {
    path: 'detail/:configurationUuid',
    component: DetailConfigurationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Configuration Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {
}
