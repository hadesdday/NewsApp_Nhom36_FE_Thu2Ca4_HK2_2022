import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../_service/token-storage.service";

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  keyword!: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }

  openSearchBox() {
    $("#search__overlay").fadeIn(500);
    $("input[name='keyword']").val("");
  }

  closeSearchBox() {
    $("#search__overlay").fadeOut(500);
  }
}
