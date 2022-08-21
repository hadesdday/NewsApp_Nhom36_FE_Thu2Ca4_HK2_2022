import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbLazyLoadingModule } from 'code/mdb-angular-ui-kit/lazy-loading';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from '../shared/shared.module';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { PostService } from './post.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { NewestPostComponent } from './post-list/newest-post/newest-post.component';
import { SavedPostComponent } from '../profile/saved-post/saved-post.component';
import { ReadPostsComponent } from './read-posts/read-posts.component';
@NgModule({
  declarations: [SearchResultComponent, PostListComponent,  AdvertisementComponent, PostDetailsComponent, PostCommentComponent, NewestPostComponent, SavedPostComponent, ReadPostsComponent],
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
