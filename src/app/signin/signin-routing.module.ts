import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninFormComponent} from "./signin-form/signin-form.component";
import {RecoverPassFormComponent} from "./recover-pass-form/recover-pass-form.component";
import {ChangePassComponent} from "./change-pass/change-pass.component";

const routes: Routes = [
  {path:'signin',component:SigninFormComponent},
  {path:'recovery-password',component:RecoverPassFormComponent},
  {path:'change-password',component:ChangePassComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
