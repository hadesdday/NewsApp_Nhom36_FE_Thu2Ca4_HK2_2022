import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostService } from 'src/app/post/post.service';
import { Feed, FeedResponse } from 'src/app/_model/feed.model';
import { Post } from 'src/app/_model/post.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home';

  posts_list!: Post[];
  feed!: Feed;
  sports_news_list!: Post[];
  tech_list!: Post[];

  constructor(private postService: PostService) {
    this.posts_list = [];
    this.sports_news_list = [];
    this.tech_list = [];
  }

  ngOnInit(): void {
    this.load_data();
  }

  load_data() {
    this.load_politics_news();
    this.load_sports_news();
    this.load_tech_news();
  }

  load_politics_news() {
    this.postService.get_politics_news().subscribe((res: FeedResponse) => {
      this.posts_list = res.items;
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
      console.log("sport", res);
    });
  }

  load_tech_news() {
    this.postService.get_technology_news().subscribe((res: FeedResponse) => {
      this.tech_list = res.items;
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

}
