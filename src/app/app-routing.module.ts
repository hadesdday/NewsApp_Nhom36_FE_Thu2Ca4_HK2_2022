import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./register/register-form/register-form.component";
import {CommonModule} from "@angular/common";
import {SigninFormComponent} from "./signin/signin-form/signin-form.component";

const routes: Routes = [
  {path: 'register', component: RegisterFormComponent},
  {path:'signin',component:SigninFormComponent},
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
