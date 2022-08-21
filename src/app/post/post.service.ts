import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { API_AUTH, API_URL } from '../_api/apiURL';
import { ArticleResponse, ReadPostResponse } from '../_model/post.model';
import { Comment } from '../_model/comment.model';
import { CommonService } from '../_service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  get_list(slug: string) {
    return this.http.get<ArticleResponse>(`${API_URL.GET_LIST}${slug}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bài viết " + slug)));
  }

  search_article_by_keyword(keyword: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${API_URL.SEARCH}${keyword}`, { headers, responseType: 'text' })
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi tìm kiếm " + keyword)));
  }

  post_comment(body: any) {
    return this.http.post<Comment>(API_URL.COMMENT, body)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi đăng bình luận")));
  }

  get_comments_by_post_id(post_id: number) {
    return this.http.get<Comment[]>(`${API_URL.COMMENT}?article_id=${post_id}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy bình luận")));
  }

  get_news_details(url: string) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${API_URL.ARTICLE_DETAILS}${url}`, { headers, responseType: 'text' })
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy dữ liệu bài viết")));
  }

  get_read_news(email: string) {
    return this.http.get<ReadPostResponse>(`${API_URL.READ_POST}?email=${email}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy danh sách bài viết đã đọc")));
  }

  save_read_post(post: ReadPostResponse) {
    return this.http.put(`${API_URL.READ_POST}/${post.id}`, post)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy danh sách bài viết đã đọc")));
  }

  save_post(id_user: string, id_post: string, title: string, link: string) {
    this.http.get<any>(API_URL.ARTICLE_SAVED).subscribe(res => {
      const post = res.find((a: any) => {
        return a.id_user === id_user && a.id_post === id_post
      })
      if (!post) {
        this.http.post<any>(API_URL.ARTICLE_SAVED, {
          "id_user": id_user,
          "id_post": id_post,
          "title": title,
          "link_post": link
        }).subscribe(res => {
          this.commonService.toastSuccess("Đã lưu thành công")
        }, error => {
          this.commonService.toastError("Lưu thất bại! xin vui lòng thử lại")

        })
      } else {
        this.commonService.toastAlert("Bạn đã lưu tin này!")
      }
    });
  }

  get_savedPost(id_user: string) {
    return this.http.get<any>(`${API_URL.ARTICLE_SAVED}?id_usert=${id_user}`)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy tin tức đã lưu")));
  }

  delete_saved_post(id: string) {
    return this.http.delete<any>(API_URL.ARTICLE_SAVED + "/" + id)
      .pipe(catchError(err => this.commonService.handleError(err, "Lỗi khi lấy tin tức đã lưu")));
  }
}
