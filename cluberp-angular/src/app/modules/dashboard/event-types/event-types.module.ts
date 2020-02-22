import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListEventTypeComponent} from './pages/list-event-type/list-event-type.component';
import {CreateEventTypeComponent} from './pages/create-event-type/create-event-type.component';
import {DetailEditTypeComponent} from './pages/detail-edit-type/detail-edit-type.component';
import {EventTypesRoutingModule} from './event-types-routing.module';
import {SharedModule} from '../../../shared';

@NgModule({
  declarations: [
    ListEventTypeComponent,
    CreateEventTypeComponent,
    DetailEditTypeComponent
  ],
  imports: [
    CommonModule,
    EventTypesRoutingModule,
    SharedModule
  ]
})
export class EventTypesModule {
}
