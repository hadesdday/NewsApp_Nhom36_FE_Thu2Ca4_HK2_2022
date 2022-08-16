import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API_URL } from '../_api/apiURL';
import { ArticleResponse } from '../_model/post.model';
import { Comment } from '../_model/comment.model';
import { CommonService } from '../_service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get_list(slug: string) {
    return this.http.get<ArticleResponse>(`${API_URL.GET_LIST}${slug}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + slug)));
  }

  search_article_by_keyword(keyword: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get("https://api-news-vietnamnet.herokuapp.com/api/search/" + keyword, { headers, responseType: 'text' })
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi tìm kiếm " + keyword)));
  }

  post_comment(body: any) {
    console.log(body);
    return this.http.post<Comment>(API_URL.COMMENT, body)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi đăng bình luận")));
  }

  get_comments_by_post_id(post_id: number) {
    return this.http.get<Comment[]>(`${API_URL.COMMENT}?article_id=${post_id}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bình luận")));
  }
}
