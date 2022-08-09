import { Component, OnInit } from '@angular/core';
import slugify from 'slugify';
import { PostService } from 'src/app/post/post.service';
import { Article, ArticleResponse } from 'src/app/_model/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Trang chủ';

  article_list!: Article[];
  ts_news!: Article[];
  tech_news!: Article[];
  business_news!: Article[];

  constructor(private postService: PostService) {
    this.article_list = [];
    this.ts_news = [];
    this.tech_news = [];
    this.business_news = [];
  }

  ngOnInit(): void {
    this.load_data();
  }

  load_data() {
    this.load_hot_news();
    this.load_ts_news();
    this.load_tech_news();
    this.load_business_news();
  }

  load_hot_news() {
    this.postService.get_list("vietnamnet").subscribe((res: ArticleResponse) => {
      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: curr.description[0].trim(),
          guid: curr.guid[0].trim(),
          link: curr.link[0].trim(),
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
        this.article_list.push(currentItem);
      });
      console.log(this.article_list);
    });
  }

  load_ts_news() {
    this.postService.get_list("thoi-su").subscribe((res: ArticleResponse) => {
      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: curr.description[0].trim(),
          guid: curr.guid[0].trim(),
          link: curr.link[0].trim(),
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
        this.ts_news.push(currentItem);
      });
    });
  }

  load_tech_news() {
    this.postService.get_list("cong-nghe").subscribe((res: ArticleResponse) => {
      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: curr.description[0].trim(),
          guid: curr.guid[0].trim(),
          link: curr.link[0].trim(),
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
        this.tech_news.push(currentItem);
      });
    });
  }

  load_business_news() {
    this.postService.get_list("kinh-doanh").subscribe((res: ArticleResponse) => {
      var items = res.item;

      Object.entries(items).map(([key, value]) => {
        var curr: any = value;

        var singleQuote = curr.title[0].trim().split("&amp;apos;").join("'");
        var andSymbol = singleQuote.split("&amp;amp;").join("&");
        var finalTitle = andSymbol;

        let currentItem: Article = {
          category: curr.category[0].trim(),
          description: curr.description[0].trim(),
          guid: curr.guid[0].trim(),
          link: curr.link[0].trim(),
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
        this.business_news.push(currentItem);
      });
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

  get_home_list_with_amount(startIndex: number, amount: number) {
    return this.article_list.slice(startIndex, amount);
  }

  get_list_with_amount(startIndex: number, amount: number, list: Article[]) {
    return list.slice(startIndex, amount);
  }

  get_slug(titleName: string) {
    var slug = slugify(titleName.toLowerCase()).replace("dj", "d")
    return slug;
  }
}
