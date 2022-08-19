import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @Input() url = '';
  @Input() ref = '';
  constructor() { }

  ngOnInit(): void {
  }

}
