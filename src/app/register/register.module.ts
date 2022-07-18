import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegisterFormComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule
    ],
  exports:[
    RegisterFormComponent
  ]
})
export class RegisterModule { }
