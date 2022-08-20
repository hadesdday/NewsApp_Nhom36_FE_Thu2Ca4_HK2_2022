import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdbLazyLoadingModule } from 'mdb-angular-ui-kit/lazy-loading';
import { NotfoundComponent } from '../pages/notfound/notfound.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'search/:keyword/:tag', component: SearchResultComponent },
  { path: 'chu-de/:title', component: PostListComponent },
  { path: 'bai-viet/:url', component: PostDetailsComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MdbLazyLoadingModule,
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
