import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { load } from 'cheerio';
import { Article, ArticleResponse } from 'src/app/_model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public postCommentForm!: FormGroup;
  comments_list!: Comment[];
  post_details!: any;
  post_id!: string;
  post_url!: string;
  title!: string;
  posts_list!: Article[];

  constructor(private formBuilder: FormBuilder, private postService: PostService, private domSanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
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
  }

  sanitize(html: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  get_data() {
    this.activatedRoute.params.subscribe(params => {
      this.post_url = params['url'];
      this.postService.get_news_details(this.post_url).subscribe(res => {
        const $dom = load(res);

        $dom(".newsFeature__header-title").addClass("green");
        $dom(".newsFeature__boxAuthor").remove();
        $dom(".controll__box").remove();
        $dom(".vnn-template-noneditable").remove();
        $dom("table").remove();
        const slug = $dom(".breadcrumb-box__link p a").attr("href");
        this.title = slug!.split("/")[1];
        $dom("head").append('<link rel="stylesheet" href="/assets/css/style.css">');
        this.post_details = this.sanitize($dom.html());
        this.get_post_list(this.title);
      });

      var dashed = this.post_url.split("-");
      var id = dashed[dashed.length - 1].replace(".html", "");
      this.post_id = id;
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
        this.posts_list.push(currentItem);
      });
      // this.isLoading = false;
      // console.log(this.posts_list);
    });
  }

  get_posts_with_amount(startIndex: number, endIndex: number) {
    return this.posts_list.slice(startIndex, endIndex);
  }


}
