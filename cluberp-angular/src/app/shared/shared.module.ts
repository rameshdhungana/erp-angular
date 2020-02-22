import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ControlMessagesComponent} from './components/control-messages/control-messages.component';
import {AlertComponent} from './components/alert/alert.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {AlertService} from './services/alert.service';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {SelectModule} from 'ng2-select';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {AlertModule} from 'ngx-bootstrap/alert';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SpinnerOverlayComponent} from './components/spinner-overlay/spinner-overlay.component';
import {ConvertToTwoFixedDecimalPipe} from './pipes/convert-to-two-fixed-decimal.pipe';
import {ConvertNegativeToPositiveNumberPipe} from './pipes/convert-negative-to-positive-number.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    AlertModule.forRoot(),
    OwlDateTimeModule,
    SelectDropDownModule,
    ModalModule.forRoot(),


  ],
  declarations: [
    ControlMessagesComponent,
    SpinnerComponent,
    AlertComponent,
    SpinnerOverlayComponent,
    ConvertToTwoFixedDecimalPipe,
    ConvertNegativeToPositiveNumberPipe,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ControlMessagesComponent,
    AlertComponent,
    SpinnerComponent,
    BsDatepickerModule,
    CKEditorModule,
    TimepickerModule,
    SelectModule,
    SelectDropDownModule,
    // valor software imported module for alert
    AlertModule,
    // datetime picer (date and time on UI)
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ModalModule,
    SpinnerOverlayComponent,
    ConvertToTwoFixedDecimalPipe,
    ConvertNegativeToPositiveNumberPipe

  ],
  providers: [
    // custom created alert-service
    AlertService,

  ]
})
export class SharedModule {

}

