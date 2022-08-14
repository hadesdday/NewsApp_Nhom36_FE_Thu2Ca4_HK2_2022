import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../_service/token-storage.service";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  emailParam: any;
  tokenParam: any;
  constructor( private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailParam = params['email'];
      this.tokenParam = params['token'];

      this.http.get<any>("http://localhost:3000/user").subscribe(res => {
        const user = res.find((a: any) => {
          return a.email ===this.emailParam
        })
        if (user) {
          this.tokenStorage.saveUser(user);
          console.log(user);
          if(user.comfirmToken=== this.tokenParam){
            user.comfirmToken="ok"
            this.http.put("http://localhost:3000/user/" +user.id, user).subscribe(res => {
              alert("success")
            })
          }
        }else{
          alert("login false")
        }
      })
    });

  }

}
