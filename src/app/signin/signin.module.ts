import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { RecoverPassFormComponent } from './recover-pass-form/recover-pass-form.component';
import { ChangePassComponent } from './change-pass/change-pass.component';


@NgModule({
  declarations: [
    SigninFormComponent,
    RecoverPassFormComponent,
    ChangePassComponent
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
