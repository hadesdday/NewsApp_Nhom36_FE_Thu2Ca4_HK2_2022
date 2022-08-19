import { Component, Input, OnInit } from '@angular/core';
import slugify from 'slugify';
import { Article } from 'src/app/_model/post.model';

@Component({
  selector: 'sub-new',
  templateUrl: './sub-new.component.html',
  styleUrls: ['./sub-new.component.scss']
})
export class SubNewComponent implements OnInit {
  @Input() posts !: Article[];
  @Input() title = '';
  constructor() { }

  ngOnInit(): void {
  }

  get_slug(titleName: string) {
    var slug = slugify(titleName.toLowerCase()).replace("dj", "d")
    return slug;
  }
}
