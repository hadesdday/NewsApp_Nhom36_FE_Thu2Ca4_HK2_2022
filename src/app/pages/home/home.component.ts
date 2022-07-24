import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../_service/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor() {
  }

  ngOnInit(): void {

  }

}
