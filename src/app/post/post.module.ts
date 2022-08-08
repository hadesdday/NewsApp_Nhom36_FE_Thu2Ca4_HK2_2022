import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';
import { PostService } from './post.service';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [SearchResultComponent, PostListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MdbLazyLoadingModule,
    SharedModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
