import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContentRoutingModule} from './main-content-routing.module';
import {MainContentComponent} from './pages/main-content.component';
import {SharedModule} from '../../../shared';

@NgModule({
  declarations: [
    MainContentComponent
  ],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    SharedModule,

  ]
})
export class MainContentModule {
}
