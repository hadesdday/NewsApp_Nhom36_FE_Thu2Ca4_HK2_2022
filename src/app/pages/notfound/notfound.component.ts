import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  keyword!: string;
  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Không tìm thấy | News");
  }

  search(event: KeyboardEvent) {
    if (event.code === "Enter") {
      const url = $(".search__act").attr("href");
      this.router.navigateByUrl(url);
    }
  }

}
