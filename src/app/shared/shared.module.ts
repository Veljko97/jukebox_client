import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    NgxUiLoaderModule
    ],
  exports: [
    MaterialModule,
    NgxUiLoaderModule
  ]
})
export class SharedModule { }
