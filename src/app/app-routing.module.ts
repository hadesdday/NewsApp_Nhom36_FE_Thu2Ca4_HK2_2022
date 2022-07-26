import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from "./profile/profile/profile.component";
import { RegisterFormComponent } from "./register/register-form/register-form.component";
import { ChangePassComponent } from "./signin/change-pass/change-pass.component";
import { SigninFormComponent } from "./signin/signin-form/signin-form.component";

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'signin', component: SigninFormComponent },
  { path: 'change-password', component: ChangePassComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '404', component: NotfoundComponent },
  // { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
