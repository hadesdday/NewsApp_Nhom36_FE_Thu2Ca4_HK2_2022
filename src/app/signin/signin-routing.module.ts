import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninFormComponent} from "./signin-form/signin-form.component";

const routes: Routes = [
  {path:'signin',component:SigninFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
