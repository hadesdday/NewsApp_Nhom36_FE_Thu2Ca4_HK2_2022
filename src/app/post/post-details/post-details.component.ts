import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { load } from 'cheerio';
import { Article, ArticleResponse } from 'src/app/_model/post.model';
import { PostService } from '../post.service';
import { Comment } from 'src/app/_model/comment.model';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private formBuilder: FormBuilder, private postService: PostService, private domSanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private titleService: Title, private toastService: ToastrService) {
    this.comments_list = [];
    this.posts_list = [];
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
        this.titleService.setTitle(title + " | News");

        $dom("head").append('<link rel="stylesheet" href="/assets/css/style.css">');
        this.post_details = this.sanitize($dom.html());
        this.get_post_list(this.title);
      });

      var dashed = this.post_url.split("-");
      var id = dashed[dashed.length - 1].replace(".html", "");
      this.post_id = Number(id);
      this.get_comment_by_post_id(this.post_id);
      this.postCommentForm.get("article_id")?.setValue(this.post_id);
    });
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

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: finalDescription,
          guid: curr.guid[0].trim(),
          link: url,
          media: "",
          pubDate: curr.pubDate[0].trim(),
          title: finalTitle
        };

        Object.keys(curr).forEach(function (key, index) {
          var article = curr[key];
          if (index === 6) {
            var url = article[0]?.$;
            Object.keys(url).forEach(function (key, index) {
              if (index === 2) {
                currentItem.media = url[key];
                return;
              }
            });
          }
        });
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

  generateRandom(min: number, max: number) {
    let rand = Math.random();
    rand = Math.floor(rand * (max - min));
    rand = rand + min;
    return rand;
  }
}
