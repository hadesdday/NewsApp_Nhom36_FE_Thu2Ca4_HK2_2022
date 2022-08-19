import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/_model/post.model';

@Component({
  selector: 'newest-post',
  templateUrl: './newest-post.component.html',
  styleUrls: ['./newest-post.component.scss']
})
export class NewestPostComponent implements OnInit {
  @Input() articles!: Article[];
  constructor() { }

  ngOnInit(): void {
  }

  get_time_in_words(date: string) {
    var monthNames = ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Bốn", "Tháng Năm", "Tháng Sáu",
      "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười", "Tháng Mười Hai"
    ];
    var d = new Date(date);
    var day = d.getDate();
    var month = monthNames[d.getMonth()];
    var year = d.getFullYear();

    var fullDatetime = 'Ngày ' + day + ', ' + month + ' , ' + year;
    return fullDatetime;
  }

}
