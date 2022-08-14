import { Component, OnInit } from '@angular/core';
import {MdbPopconfirmRef} from "mdb-angular-ui-kit/popconfirm";

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements OnInit {

  constructor(public popupconfirmRef: MdbPopconfirmRef<PopupConfirmComponent>) { }

  ngOnInit(): void {
  }

}
