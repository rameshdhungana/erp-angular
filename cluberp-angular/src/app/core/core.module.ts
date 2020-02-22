import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {environment} from '../../environments/environment.prod';
import {AuthGuard, NoAuthGuard} from './guards';

// import { NgxSpinnerModule } from 'ngx-spinner';

import {ErrorInterceptor, TokenInterceptor} from './interceptors';

import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    // NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
