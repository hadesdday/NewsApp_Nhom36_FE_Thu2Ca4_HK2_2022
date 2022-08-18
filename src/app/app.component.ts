import { Component } from '@angular/core';
import slugify from 'slugify';
import { API_SUB } from './_api/apiURL';
import { TokenStorageService } from "./_service/token-storage.service";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'News';
  username?: string;
  isLoggedIn = false;
  constructor(private tokenStorageService: TokenStorageService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.tokenStorageService.getUser()!={};
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
    this.onShowingScrollToTop();
  }

  onShowingScrollToTop() {
    window.addEventListener('scroll', () => {
      if ($(window).scrollTop() > 100) {
        $("#scrollToTop").addClass('show');
      } else {
        $("#scrollToTop").removeClass('show');
      }
    });

    $("#scrollToTop").on('click', (e: any) => {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, '300');
    });
  }

  routeChanged() {
    console.log("route changed");
  }

}
