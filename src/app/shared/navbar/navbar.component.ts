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

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    alert(this.currentUser.username)
  }

  // showSearchModal() {
  //   $(".search-modal > form").removeClass("d-none");
  // }

}
