import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageService } from "../../../_service/token-storage.service";
import { API_AUTH } from 'src/app/_api/apiURL';
import { CommonService } from "../../../_service/common.service";
import { Title } from '@angular/platform-browser';

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.newPass === v.re_newPass) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  public changePassForm !: FormGroup;
  currentUser: any;
  submitted = false;
  isWrongPass = false;
  emailParam: any;
  tokenParam: any;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private http: HttpClient, private commonService: CommonService, private router: Router, private tokenStorage: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Đổi mật khẩu | News");
    this.route.queryParams.subscribe(params => {
      this.emailParam = params['email'];
      this.tokenParam = params['token'];
    });
    console.log(this.emailParam)

    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser)
    this.changePassForm = this.formBuilder.group({
      oldPass: new FormControl("", [Validators.required]),
      new_pw: this.formBuilder.group({
        newPass: new FormControl('', [Validators.required]),
        re_newPass: new FormControl('', [Validators.required])
      }, { validators: comparePassword })
    })
  }
  changePasswordFunc() {
    if (!this.changePassForm.hasError('passwordnotmatch', ['new_pw'])) {
      this.currentUser.password = this.changePassForm.controls['new_pw'].value.newPass;
      this.currentUser.recoveryToken = "";
      this.http.put(API_AUTH.USER + this.currentUser.id, this.currentUser).subscribe(res => {
        this.commonService.toastSuccess("thay đổi mật khẩu thành công!")
        this.tokenStorage.saveUser(this.currentUser);
        localStorage.setItem("isSignin", "true");
        this.currentUser = this.tokenStorage.getUser();
        console.log(this.currentUser)
        this.router.navigate(["profile"])
        this.submitted = false;
      })
    }
  }
  changePassword() {
    this.submitted = true;
    console.log(this.currentUser)
    if (this.emailParam != null) {
      this.http.get<any>(API_AUTH.USER).subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.emailParam && a.recoveryToken === this.tokenParam;
        })
        this.currentUser = user;
        this.changePasswordFunc()
      })
    } else {
      if (this.currentUser.password != this.changePassForm.value.oldPass) {
        this.isWrongPass = true;
      } else {
        this.isWrongPass = false;
        this.changePasswordFunc()
      }
    }
  }
}
