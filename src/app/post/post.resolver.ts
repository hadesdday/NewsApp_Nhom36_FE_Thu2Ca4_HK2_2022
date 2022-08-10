import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router
} from '@angular/router';
import { catchError, delay, Observable } from 'rxjs';
import { ArticleResponse } from '../_model/post.model';
import { CommonService } from '../_service/common.service';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<ArticleResponse> {
  constructor(private postService: PostService, private router: Router, private commonService: CommonService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<ArticleResponse> {
    return this.postService.get_list(route.params?.title).pipe(
      delay(2000),
      catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + route.params?.slug))
    );
  }
}
