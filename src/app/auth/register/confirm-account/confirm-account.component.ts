import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../_service/token-storage.service";
import {CommonService} from "../../../_service/common.service";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  emailParam: any;
  tokenParam: any;
  constructor( private http: HttpClient, private router: Router,private commonService: CommonService, private tokenStorage: TokenStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailParam = params['email'];
      this.tokenParam = params['token'];
      if(this.emailParam==null||this.tokenParam==null)
        this.router.navigate(['home'])
      this.http.get<any>("http://localhost:3000/user").subscribe(res => {
        const user = res.find((a: any) => {
          return a.email ===this.emailParam
        })
        if (user) {
          this.tokenStorage.saveUser(user);
          localStorage.setItem("isSignin", "true");
          console.log(user);
          if(user.comfirmToken=== this.tokenParam){
            user.comfirmToken="ok"
            this.http.put("http://localhost:3000/user/" +user.id, user).subscribe(res => {

            })
          }else{
            this.router.navigate(['signin'])
          }
        }else{
          this.commonService.toastError("Đã có lỗi xảy ra!! Xin vui lòng thử lại")
          this.router.navigate(['signin'])
        }
      })
    });

  }

}
