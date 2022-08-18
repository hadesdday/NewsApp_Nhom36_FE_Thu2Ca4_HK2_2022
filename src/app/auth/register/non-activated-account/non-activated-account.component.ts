import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../../_service/token-storage.service";
import {AuthService} from "../../../_service/auth.service";
import {generateToken} from "../../signin/recover-pass-form/recover-pass-form.component";

@Component({
  selector: 'app-non-activated-account',
  templateUrl: './non-activated-account.component.html',
  styleUrls: ['./non-activated-account.component.scss']
})
export class NonActivatedAccountComponent implements OnInit {
  emailParam: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {


  }

  resendKey() {
    this.route.queryParams.subscribe(params => {
      this.emailParam = params['email'];
      if (this.emailParam == null)
        this.router.navigate(['home'])
      this.http.get<any>("http://localhost:3000/user").subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.emailParam
        })
        if (user) {
          this.authService.sendActivatedKey(this.emailParam, user.comfirmToken);
        } else {
          this.router.navigate(['home'])
        }
      })

    })
  }

}
