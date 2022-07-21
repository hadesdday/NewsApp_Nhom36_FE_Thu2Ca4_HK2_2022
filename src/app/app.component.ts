import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'News';
  constructor() {
  }
  ngOnInit() {

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
