import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninFormComponent } from './signin-form/signin-form.component';


@NgModule({
  declarations: [
    SigninFormComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule
  ],
  exports:[
    SigninFormComponent
  ]
})
export class SigninModule { }
