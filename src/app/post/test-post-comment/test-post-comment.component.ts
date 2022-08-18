import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Comment } from "../../_model/comment.model";
import { Cheerio, load } from 'cheerio'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-test-post-comment',
  templateUrl: './test-post-comment.component.html',
  styleUrls: ['./test-post-comment.component.scss']
})
export class TestPostCommentComponent implements OnInit {

  public testForm!: FormGroup;
  comments_list!: Comment[];
  post_details!: any;

  constructor(private formBuilder: FormBuilder, private service: PostService, private domSanitizer: DomSanitizer) {
    this.comments_list = [];
  }

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      article_id: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    this.get_data();
  }


  sanitize(html: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  get_data() {
    this.service.get_news_details("cuu-thu-tuong-ehud-barak-israel-tim-moi-cach-de-phat-hien-cham-soc-tung-nhan-tai-2049939.html").subscribe(res => {
      const $dom = load(res);
      $dom(".newsFeature__header-title").addClass("green");
      $dom(".newsFeature__boxAuthor").remove();
      $dom(".controll__box").remove();
      $dom(".vnn-template-noneditable").remove();
      $dom("table").remove();
      $dom("head").append('<link rel="stylesheet" href="/assets/css/style.css">');
      this.post_details = this.sanitize($dom.html());
      console.log($dom.html())
    });
  }


  testlog() {
    alert("awda");
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
