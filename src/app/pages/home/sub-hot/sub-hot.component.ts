import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/post.model';

@Component({
  selector: 'sub-hot',
  templateUrl: './sub-hot.component.html',
  styleUrls: ['./sub-hot.component.scss']
})
export class SubHotComponent implements OnInit {
  @Input() posts!: Article[];
  constructor() { }

  ngOnInit(): void {
  }

}
