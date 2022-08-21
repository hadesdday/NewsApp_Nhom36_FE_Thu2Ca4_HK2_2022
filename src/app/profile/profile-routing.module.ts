import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";
import { SavedPostComponent } from "./saved-post/saved-post.component";
import { AuthGuard } from "../_guard/auth.guard";
import { ReadPostsComponent } from './read-posts/read-posts.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'saved-post', component: SavedPostComponent, canActivate: [AuthGuard] },
  { path: 'read-posts', component: ReadPostsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
