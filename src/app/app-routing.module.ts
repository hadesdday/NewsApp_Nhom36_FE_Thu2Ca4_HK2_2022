import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from "./profile/profile/profile.component";
import { AuthGuard } from "./_help/auth.guard";

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },

  { path: 'contact', component: ContactComponent },
  { path: '404', component: NotfoundComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  // { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
