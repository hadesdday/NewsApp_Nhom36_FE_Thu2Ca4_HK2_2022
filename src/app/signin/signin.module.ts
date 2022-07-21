import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { RecoverPassFormComponent } from './recover-pass-form/recover-pass-form.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SigninFormComponent,
    RecoverPassFormComponent,
    ChangePassComponent
  ],
    imports: [
        CommonModule,
        SigninRoutingModule,
        ReactiveFormsModule
    ],
  exports:[
    SigninFormComponent
  ]
})
export class SigninModule { }
