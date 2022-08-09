import { Component, OnInit } from '@angular/core';
import slugify from 'slugify';
import { PostService } from 'src/app/post/post.service';
import { API_SUB } from 'src/app/_api/apiURL';
import { Feed, FeedResponse } from 'src/app/_model/feed.model';
import { Post } from 'src/app/_model/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Trang chủ';

  posts_list!: Post[];
  feed!: Feed;
  sports_news_list!: Post[];
  tech_list!: Post[];
  first_post_slug!: string;

  constructor(private postService: PostService) {
    this.posts_list = [];
    this.sports_news_list = [];
    this.tech_list = [];
  }

  ngOnInit(): void {
    this.load_data();
  }

  load_data() {
    // this.load_politics_news();
    this.load_hot_news();
    this.load_sports_news();
    this.load_tech_news();
  }

  load_hot_news() {
    this.postService.get_news_list_by_slug('vietnamnet').subscribe((res: FeedResponse) => {
      this.posts_list = res.items;
      this.posts_list.forEach(elm => {
        var title = elm['title'];
        var first = title.replace("&amp;amp;apos;", "'");
        var second = first.replace("&amp;amp;apos;", "'");
        elm['title'] = second;
      });
      console.log("politics", res);

      Object.entries(res).map(([key, value]) => {
        if (key === 'items') {
          this.posts_list = value;
        }
        if (key === 'feed') {
          this.feed = value;
        }
      });
    });
  }

  load_politics_news() {
    this.postService.get_politics_news().subscribe((res: FeedResponse) => {
      this.posts_list = res.items;
      this.posts_list.forEach(elm => {
        var title = elm['title'];
        var first = title.replace("&amp;amp;apos;", "'");
        var second = first.replace("&amp;amp;apos;", "'");
        elm['title'] = second;
      });
      console.log("politics", res);

      Object.entries(res).map(([key, value]) => {
        if (key === 'items') {
          this.posts_list = value;
        }
        if (key === 'feed') {
          this.feed = value;
        }
      });
    });
  }

  load_sports_news() {
    this.postService.get_sports_news().subscribe((res: FeedResponse) => {
      this.sports_news_list = res.items;
      this.sports_news_list.forEach(elm => {
        var title = elm['title'];
        var first = title.replace("&amp;amp;apos;", "'");
        var second = first.replace("&amp;amp;apos;", "'");
        elm['title'] = second;
      });
      console.log("sport", res);
    });
  }

  load_tech_news() {
    this.postService.get_technology_news().subscribe((res: FeedResponse) => {
      this.tech_list = res.items;
      this.tech_list.forEach(elm => {
        var title = elm['title'];
        var second = title.split("&amp;amp;apos;").join("'");
        elm['title'] = second;
      });
      console.log("tech", res);
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

  get_politics_list_with_amount(startIndex: number, amount: number) {
    return this.posts_list.slice(startIndex, amount);
  }

  get_sports_list_with_amount(startIndex: number, amount: number) {
    return this.sports_news_list.slice(startIndex, amount);
  }

  get_tech_list_with_amount(startIndex: number, amount: number) {
    return this.tech_list.slice(startIndex, amount);
  }

  get_slug(titleName: string) {
    var slug = slugify(titleName.toLowerCase()).replace("dj", "d")
    return slug;
  }
}
