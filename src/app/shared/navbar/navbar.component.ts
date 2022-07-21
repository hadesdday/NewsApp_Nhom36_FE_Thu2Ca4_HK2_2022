import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  keyword!: string;

  constructor() { }

  ngOnInit(): void {
  }

  openSearchBox() {
    $("#search__overlay").fadeIn(500);
    $("input[name='keyword']").val("");
  }

  closeSearchBox() {
    $("#search__overlay").fadeOut(500);
  }
}
