import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {SavedPostComponent} from "./saved-post/saved-post.component";

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'saved-post', component: SavedPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
