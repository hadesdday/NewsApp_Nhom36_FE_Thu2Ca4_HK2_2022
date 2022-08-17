import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { TestPostCommentComponent } from './test-post-comment/test-post-comment.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
@NgModule({
  declarations: [SearchResultComponent, PostListComponent, TestPostCommentComponent, AdvertisementComponent],
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
