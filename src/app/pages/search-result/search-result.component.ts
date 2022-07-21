import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  keyword!: string;
  tag!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.load_data();
  }

  load_data() {
    this.get_keyword();
  }

  get_keyword() {
    this.activatedRoute.params.subscribe((params) => {
      this.keyword = params['keyword'];
      this.tag = params['tag'];
    })
  }


}
