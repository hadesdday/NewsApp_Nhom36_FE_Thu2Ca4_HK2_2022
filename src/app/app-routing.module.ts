import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from "./register/register-form/register-form.component";
import { SigninFormComponent } from "./signin/signin-form/signin-form.component";
import { ChangePassComponent } from "./signin/change-pass/change-pass.component";

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'signin', component: SigninFormComponent },
  { path: 'change-password', component: ChangePassComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
