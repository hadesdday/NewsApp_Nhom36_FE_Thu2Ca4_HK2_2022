import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword!: string;

  constructor() { }

  ngOnInit(): void {
    $("select").niceSelect();
  }


  updateOption() {
    $("select").niceSelect("update");
  }

}
