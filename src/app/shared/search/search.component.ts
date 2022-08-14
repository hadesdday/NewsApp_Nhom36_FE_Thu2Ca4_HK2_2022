import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import slugify from 'slugify';
import { API_SUB } from 'src/app/_api/apiURL';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword!: string;
  title_list!: string[];
  slug_list!: string[];
  tag!: string;

  constructor(private activatedRoute: ActivatedRoute, private titleService: Title, private router: Router) {
    this.title_list = [];
    this.slug_list = [];
  }

  ngOnInit(): void {
    $("select").niceSelect();
    this.load_data();
    this.titleService.setTitle("Kết quả tìm kiếm | News");
    this.updateOption();
  }

  search(event: KeyboardEvent) {
    if (event.code === "Enter") {
      const url = $(".search__action").attr("href");
      this.router.navigateByUrl(url);
    }
  }

  load_data() {
    this.activatedRoute.params.subscribe((params) => {
      this.keyword = params['keyword'];
      this.tag = params['tag'];
    });

    Object.entries(API_SUB).map(([key, value]) => {
      var item = {
        title: value,
        slug: slugify(value.toLowerCase()).replace("dj", "d")
      };
      this.title_list.push(item.title);
      this.slug_list.push(item.slug);
      $("select[class='sort__by_title']").append(`<option value="${item.slug}">${item.title}</option>`);
    });
    $("select").niceSelect("update");
  }

  get_selected_option() {
    var rel = Number($("select[class='sort__by_relevant'] option:selected").val());
    var date = $("select[class='sort__by_date'] option:selected").val();
    var title = $("select[class='sort__by_title'] option:selected").val();

    var finalKeyword = "od=" + rel + "&date=" + date + "&title=" + title;

    return finalKeyword;
  }

  updateOption() {
    var tags = this.tag.split("&");
    var od_alphabet = tags[0].split("=")[1];
    var date = tags[1].split("=")[1];
    var title = tags[2].split("=")[1];

    $("select[class='sort__by_relevant']").val(od_alphabet);
    $("select[class='sort__by_date']").val(date);
    $("select[class='sort__by_title']").val(title);

    $("select").niceSelect("update");
  }

}
