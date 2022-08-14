import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { SigninFormComponent } from './signin/signin-form/signin-form.component';
import { RecoverPassFormComponent } from './signin/recover-pass-form/recover-pass-form.component';
import { ChangePassComponent } from './signin/change-pass/change-pass.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmAccountComponent } from './register/confirm-account/confirm-account.component';

@NgModule({
  declarations: [RegisterFormComponent, SigninFormComponent, RecoverPassFormComponent, ChangePassComponent, ConfirmAccountComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class AuthModule { }
