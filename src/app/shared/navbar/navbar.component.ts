import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import slugify from 'slugify';
import { API_SUB } from 'src/app/_api/apiURL';
import { FeedModel } from 'src/app/_model/feed.model';
import { TokenStorageService } from "../../_service/token-storage.service";

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  currentUser: any;
  keyword!: string;
  feeds_list!: FeedModel[];

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.feeds_list = [];
    Object.entries(API_SUB).map(([key, value]) => {
      var item = {
        title: value,
        slug: slugify(value.toLowerCase()).replace("dj", "d")
      };
      this.feeds_list.push(item);
    });
  }

  search(event: KeyboardEvent) {
    if (event.code === "Enter") {
      const url = $(".button__search").attr("href");
      this.closeSearchBox();
      this.router.navigateByUrl(url);
    }
  }

  openSearchBox() {
    $("#search__overlay").fadeIn(500);
    $("input[name='keyword']").val("");
  }

  closeSearchBox() {
    $("#search__overlay").fadeOut(500);
  }

  signOut() {
    this.tokenStorage.signOut();
  }
}
