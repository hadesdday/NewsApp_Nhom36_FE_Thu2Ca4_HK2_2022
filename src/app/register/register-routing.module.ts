import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";

const routes: Routes = [
  {path: 'register', component: RegisterFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
