import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { FeedResponse } from '../_model/feed.model';
import { ArticleResponse } from '../_model/post.model';
import { CommonService } from '../_service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get_news_list_by_slug(slug: string) {
    return this.http.get<FeedResponse>("https://api-news-vietnamnet.herokuapp.com/api/get/" + slug)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + slug)));
  }

  get_list(slug: string) {
    return this.http.get<ArticleResponse>("https://api-news-vietnamnet.herokuapp.com/api/get/" + slug)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + slug)));
  }
}
