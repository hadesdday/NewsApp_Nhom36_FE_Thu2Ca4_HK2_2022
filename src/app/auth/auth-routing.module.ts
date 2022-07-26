import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { ChangePassComponent } from './signin/change-pass/change-pass.component';
import { RecoverPassFormComponent } from './signin/recover-pass-form/recover-pass-form.component';
import { SigninFormComponent } from './signin/signin-form/signin-form.component';

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'signin', component: SigninFormComponent },
  { path: 'recovery-password', component: RecoverPassFormComponent },
  { path: 'change-password', component: ChangePassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
