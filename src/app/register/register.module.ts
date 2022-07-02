import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';


@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ],
  exports:[
    RegisterFormComponent
  ]
})
export class RegisterModule { }
