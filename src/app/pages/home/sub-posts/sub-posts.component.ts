import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/post.model';

@Component({
  selector: 'sub-posts',
  templateUrl: './sub-posts.component.html',
  styleUrls: ['./sub-posts.component.scss']
})
export class SubPostsComponent implements OnInit {
  @Input() subPosts!: Article[];
  constructor() { }

  ngOnInit(): void {
  }

}
