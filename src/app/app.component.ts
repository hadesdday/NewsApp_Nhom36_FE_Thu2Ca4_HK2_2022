import { Component } from '@angular/core';
import {TokenStorageService} from "./_service/token-storage.service";

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
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
    window.addEventListener('scroll', () => {
      if ($(window).scrollTop() > 300) {
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
}
