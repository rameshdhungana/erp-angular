import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationsRoutingModule} from './configurations-routing.module';
import {CreateConfigurationComponent} from './pages/create-configuration/create-configuration.component';
import {EditConfigurationComponent} from './pages/edit-configuration/edit-configuration.component';
import {ListConfigurationComponent} from './pages/list-configuration/list-configuration.component';
import {DetailConfigurationComponent} from './pages/detail-configuration/detail-configuration.component';
import {SharedModule} from '../../../shared';

@NgModule({
  declarations: [
    CreateConfigurationComponent,
    EditConfigurationComponent,
    ListConfigurationComponent,
    DetailConfigurationComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    SharedModule
  ]
})
export class ConfigurationsModule {
}
