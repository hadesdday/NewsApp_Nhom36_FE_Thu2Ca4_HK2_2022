import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "src/app/_model/comment.model";

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment!: Comment;
  constructor() { }

  ngOnInit(): void {
  }

}
