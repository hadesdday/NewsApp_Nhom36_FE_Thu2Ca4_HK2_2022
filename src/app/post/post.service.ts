import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ArticleResponse } from '../_model/post.model';
import { CommonService } from '../_service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get_list(slug: string) {
    return this.http.get<ArticleResponse>("https://api-news-vietnamnet.herokuapp.com/api/get/" + slug)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + slug)));
  }

  search_article_by_keyword(keyword: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get("https://api-news-vietnamnet.herokuapp.com/api/search/" + keyword, { headers, responseType: 'text' })
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi tìm kiếm " + keyword)));
  }
}
