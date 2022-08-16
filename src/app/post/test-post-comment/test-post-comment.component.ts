import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Comment } from "../../_model/comment.model";

declare var $: any;

@Component({
  selector: 'app-test-post-comment',
  templateUrl: './test-post-comment.component.html',
  styleUrls: ['./test-post-comment.component.scss']
})
export class TestPostCommentComponent implements OnInit {

  public testForm!: FormGroup;
  comments_list!: Comment[];

  constructor(private formBuilder: FormBuilder, private service: PostService) {
    this.comments_list = [];
  }

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      article_id: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  postComment() {
    console.log(this.testForm.value)
    this.service.post_comment(this.testForm.value).subscribe(res => {
      console.log(res);
    });
  }

  get_cmt() {
    var s = $("input[name='aid']").val();
    this.get_comment(s);
  }

  get_comment(id: number) {
    this.service.get_comments_by_post_id(id).subscribe(res => {
      this.comments_list = res;
      console.log(res);
    });
  }

}
