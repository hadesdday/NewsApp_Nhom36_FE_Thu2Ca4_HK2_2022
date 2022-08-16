import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';
import { PostService } from './post.service';
import { PostListComponent } from './post-list/post-list.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TestPostCommentComponent } from './test-post-comment/test-post-comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchResultComponent, PostListComponent, TestPostCommentComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MdbLazyLoadingModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
