import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleResponse } from 'src/app/_model/post.model';
import { PostService } from '../post.service';

declare var $: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  keyword!: string;
  tag!: string;
  response_list!: Article[];
  isLoaded = false;

  animation = 'pulse';
  count = 5;
  widthHeightSizeInPixels = 50;
  intervalId: number | null = null;

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title, private postService: PostService) {
    this.response_list = [];
  }

  ngOnInit(): void {
    this.titleService.setTitle("Kết quả tìm kiếm | News");
    this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
    this.count = 5;
    this.widthHeightSizeInPixels = this.widthHeightSizeInPixels === 50 ? 100 : 50;

    this.load_data();
  }

  load_data() {
    this.get_post_list();
  }

  get_post_list() {
    this.activatedRoute.params.subscribe((params) => {
      this.isLoaded = false;
      this.response_list = [];
      this.keyword = params['keyword'] !== 'undefined' ? params['keyword'] : '';
      this.tag = params['tag'];

      var tags = this.tag.split("&");

      var key = this.keyword;

      var od_alphabet = tags[0].split("=")[1];
      var date = tags[1].split("=")[1];
      var title = tags[2].split("=")[1];

      this.postService.get_list(title).subscribe((res: ArticleResponse) => {
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
          this.response_list.push(currentItem);
        });
        if (key !== "") {
          this.filter_list_by_title(key);
          this.sort_by_option(od_alphabet);
          this.sort_by_date(date);
        }
        this.isLoaded = true;
      });
    });
  }

  sort_by_date(by: string) {
    if (by === "1") {
      this.response_list = this.response_list.sort((a, b) => {
        const firstDate = new Date(a.pubDate);
        const secondDate = new Date(b.pubDate);

        if (firstDate < secondDate) {
          return -1;
        }
        if (firstDate > secondDate) {
          return 1;
        }
        return 0;
      });
    }
    if (by === "2") {
      this.response_list = this.response_list.sort((a, b) => {
        const firstDate = new Date(a.pubDate);
        const secondDate = new Date(b.pubDate);

        if (firstDate > secondDate) {
          return -1;
        }
        if (firstDate < secondDate) {
          return 1;
        }
        return 0;
      });
    }
  }

  get_list_with_amount(startIndex: number, endIndex: number) {
    return this.response_list.slice(startIndex, endIndex);
  }

  filter_list_by_title(title: string) {
    this.response_list = this.response_list.filter((item) => {
      var titleRemovedTones = this.removeVietnameseTones(item.title);
      var inputRemovedTones = this.removeVietnameseTones(title);
      return titleRemovedTones.toLowerCase().indexOf(inputRemovedTones) !== -1;
    });
  }

  sort_by_option(by: string) {
    if (by === "1") {
      this.response_list = this.response_list.sort((a, b) => {
        const firstTitle = this.removeVietnameseTones(a.title.toUpperCase());
        const secondTitle = this.removeVietnameseTones(b.title.toUpperCase());
        if (firstTitle < secondTitle) {
          return -1;
        }
        if (firstTitle > secondTitle) {
          return 1;
        }
        return 0;
      });
    }
    if (by === "2") {
      this.response_list = this.response_list.sort((a, b) => {
        const firstTitle = this.removeVietnameseTones(a.title.toUpperCase());
        const secondTitle = this.removeVietnameseTones(b.title.toUpperCase());
        if (firstTitle > secondTitle) {
          return -1;
        }
        if (firstTitle < secondTitle) {
          return 1;
        }
        return 0;
      });
    }
  }

  removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");

    str = str.replace(/ + /g, " ");
    str = str.trim();

    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
  }
}
