import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import slugify from 'slugify';
import { API_SUB } from 'src/app/_api/apiURL';
import { Article, ArticleResponse } from 'src/app/_model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {
  title!: string;
  slug!: string;
  posts_list!: Article[];

  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title, private postService: PostService) {
    this.posts_list = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.isLoading = true;
      this.load_data();
    });
  }

  load_data() {
    this.posts_list = [];
    this.get_post_list();
  }

  set_title() {
    var final = this.title.substring(0, 1).toUpperCase() + this.title.substring(1, this.title.length);
    if (final === "Vietnamnet") {
      final = "Tin nóng";
      this.title = "Tin nóng";
    }
    this.title = final;
    this.titleService.setTitle(final + " | News");
  }

  get_post_list() {
    this.get_title();
    this.set_title();
    this.postService.get_list(this.slug).subscribe((res: ArticleResponse) => {

      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        var finalDescription = curr.description[0].trim().split("&amp;apos;").join("'");
        finalDescription = finalDescription.split("&amp;amp;").join("&");
        var imgUrl = curr['media:content'][0]?.$.url;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: finalDescription,
          guid: curr.guid[0].trim().replace("https://vietnamnet.vn/", "bai-viet/"),
          link: curr.link[0].trim().replace("https://vietnamnet.vn/", "bai-viet/"),
          media: imgUrl,
          pubDate: curr.pubDate[0].trim(),
          title: finalTitle
        };
        this.posts_list.push(currentItem);
      });
      this.isLoading = false;
      console.log(this.posts_list);
    });
  }

  get_title_by_slug(slug: string) {
    var re = slug;
    Object.entries(API_SUB).map(([key, value]) => {
      var item = {
        title: value,
        slug: slugify(value.toLowerCase()).replace("dj", "d")
      };
      if (item.slug === slug && slug !== item.title) {
        re = item.title;
      }
    });
    return re;
  }

  get_title() {
    this.activatedRoute.params.subscribe((params) => {
      this.title = params['title'];
      this.slug = params['title'];
    });

    Object.entries(API_SUB).map(([key, value]) => {
      var item = {
        title: value,
        slug: slugify(value.toLowerCase()).replace("dj", "d")
      };
      if (item.slug === this.title) {
        this.title = item.title;
      }
    });
  }

  get_duration(date: string) {
    var date2: any = new Date();
    var date1: any = new Date(date);
    var differenceHour = Math.floor(Math.abs(date2 - date1) / 36e5);
    if (differenceHour < 1) {
      var differenceMinute = (date2.getTime() - date1.getTime()) / 1000;
      differenceMinute /= 60;
      return Math.abs(Math.round(differenceMinute)) + " phút trước";
    }
    if (differenceHour > 24) {
      return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + " ngày trước";
    }
    return differenceHour + ' giờ trước';
  }

  get_posts_with_amount(startIndex: number, endIndex: number) {
    return this.posts_list.slice(startIndex, endIndex);
  }

  get_time_in_words(date: string) {
    var monthNames = ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Bốn", "Tháng Năm", "Tháng Sáu",
      "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười", "Tháng Mười Hai"
    ];
    var d = new Date(date);
    var day = d.getDate();
    var month = monthNames[d.getMonth()];
    var year = d.getFullYear();

    var fullDatetime = 'Ngày ' + day + ', ' + month + ' , ' + year;
    return fullDatetime;
  }
}
