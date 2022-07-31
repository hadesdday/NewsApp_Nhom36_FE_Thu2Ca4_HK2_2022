import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { FeedResponse } from '../_model/feed.model';
import { CommonService } from '../_service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get_politics_news() {
    return this.http.get<FeedResponse>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvietnamnet.vn%2Frss%2Fchinh-tri.rss")
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết chính trị")));
  }

  get_sports_news() {
    return this.http.get<FeedResponse>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvietnamnet.vn%2Frss%2Fthe-thao.rss")
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết thể thao")));
  }

  get_technology_news() {
    return this.http.get<FeedResponse>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvietnamnet.vn%2Fcong-nghe.rss")
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết công nghệ")));
  }
}
