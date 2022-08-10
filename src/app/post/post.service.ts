import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
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
}
