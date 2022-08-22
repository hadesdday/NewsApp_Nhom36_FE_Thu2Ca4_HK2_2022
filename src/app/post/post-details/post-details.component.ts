import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { load } from 'cheerio';
import { Article, ArticleResponse, ReadPostResponse } from 'src/app/_model/post.model';
import { PostService } from '../post.service';
import { Comment } from 'src/app/_model/comment.model';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from "../../_service/token-storage.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public postCommentForm!: FormGroup;
  comments_list!: Comment[];
  post_details!: any;
  post_id!: number;
  post_url!: string;
  title!: string;
  posts_list!: Article[];
  isLoading = true;
  post_title!: string;
  isSignin!: boolean;

  temp!: any;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private domSanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private titleService: Title, private toastService: ToastrService, private tokenStorage: TokenStorageService) {
    this.comments_list = [];
    this.posts_list = [];
    this.isSignin = this.tokenStorage.isSignin()
  }

  ngOnInit(): void {
    this.init_form();
    this.get_data();
  }

  init_form() {
    this.postCommentForm = this.formBuilder.group({
      article_id: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    var loggedUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
    if (loggedUser) {
      const { email, name } = loggedUser;
      this.postCommentForm.get("email")?.setValue(email);
      this.postCommentForm.get("fullname")?.setValue(name);
    }
  }

  sanitize(html: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  get_data() {
    this.activatedRoute.params.subscribe(params => {
      this.isLoading = true;
      this.post_url = params['url'];
      this.postService.get_news_details(this.post_url).subscribe(res => {
        const $dom = load(res);

        $dom(".newsFeature__boxAuthor").remove();
        $dom(".controll__box").remove();
        $dom(".vnn-template-noneditable").remove();
        $dom("table").remove();
        const slug = $dom(".breadcrumb-box__link p a").attr("href");
        this.title = slug!.split("/")[1];

        var title = $dom(".newsFeature__header-title").text();
        if (title === "") {
          title = $dom(".video-detail__text h1").text();
        }
        this.post_title = title;
        this.titleService.setTitle(title + " | News");

        $dom("head").append('<link rel="stylesheet" href="/assets/css/style.css">');
        this.post_details = this.sanitize($dom.html());
        this.get_post_list(this.title);

        var loggedUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
        if (loggedUser.email !==undefined) {
          const { email } = loggedUser;
          this.postService.get_read_news(email).subscribe((res: ReadPostResponse) => {
            this.temp = res;
            var read_post = this.temp[0];
            var currentPost = {
              "title": this.post_title,
              "link": `bai-viet/${this.post_url}`
            };
            var existed = read_post.posts.find((x: any) => x?.link === currentPost.link);
            if (existed === undefined) {
              read_post.posts.push(currentPost);
              this.save_read_post(read_post);
            }
          });
        }
      });

      var dashed = this.post_url.split("-");
      var id = dashed[dashed.length - 1].replace(".html", "");
      this.post_id = Number(id);
      this.get_comment_by_post_id(this.post_id);
      this.postCommentForm.get("article_id")?.setValue(this.post_id);

    });
  }

  save_read_post(post: ReadPostResponse) {
    var loggedUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
    if (loggedUser) {
      const { email } = loggedUser;
      post.email = email;
      this.postService.save_read_post(post).subscribe(res => {
      });
    }
  }

  get_comment_by_post_id(id: number) {
    this.postService.get_comments_by_post_id(id).subscribe(res => {
      this.comments_list = res;
    });
  }

  get_post_list(slug: string) {
    this.postService.get_list(slug).subscribe((res: ArticleResponse) => {

      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        var finalDescription = curr.description[0].trim().split("&amp;apos;").join("'");
        finalDescription = finalDescription.split("&amp;amp;").join("&");

        var url = curr.link[0].trim().split("https://vietnamnet.vn/")[1];
        var imgUrl = curr['media:content'][0]?.$.url;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: finalDescription,
          guid: curr.guid[0].trim(),
          link: url,
          media: imgUrl,
          pubDate: curr.pubDate[0].trim(),
          title: finalTitle
        };

        if (currentItem.link !== this.post_url)
          this.posts_list.push(currentItem);
      });
      this.isLoading = false;
    });
  }

  post_comment() {
    this.postService.post_comment(this.postCommentForm.value).subscribe(res => {
      if (res) {
        this.toastService.success("Gửi bình luận thành công", "Thành công");
      } else {
        this.toastService.error("Gửi bình luận thất bại", "Thất bại");
      }
      this.postCommentForm.reset();
      var loggedUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
      if (loggedUser) {
        const { email, name } = loggedUser;
        this.postCommentForm.get("email")?.setValue(email);
        this.postCommentForm.get("fullname")?.setValue(name);
      }
      this.postCommentForm.get("article_id")?.setValue(this.post_id);
      this.get_comment_by_post_id(this.post_id);
    });
  }

  get_posts_with_amount(startIndex: number, endIndex: number) {
    return this.posts_list.slice(startIndex, endIndex);
  }

  get_posts_comment_with_amount(startIndex: number, endIndex: number) {
    return this.comments_list.slice(startIndex, endIndex);
  }

  save_post() {
    let user = this.tokenStorage.getUser();
    this.postService.save_post(user.id, this.post_id + "", this.post_title, this.post_url)
  }
}
