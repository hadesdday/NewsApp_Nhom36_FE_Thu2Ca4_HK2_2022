import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormControl, FormGroup, Validators
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import {Router} from "@angular/router";
import { API_AUTH } from "src/app/_api/apiURL";
import {AuthService} from "../../../_service/auth.service";
import {CommonService} from "../../../_service/common.service";

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.re_password) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {
  public registerForm !: FormGroup;
  submitted = false;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private http: HttpClient,private commonService: CommonService, private router: Router, private authService: AuthService) {
    this.titleService.setTitle("Đăng ký tài khoản | News");
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      pw: this.formBuilder.group({
        password: new FormControl('', [Validators.required]),
        re_password: new FormControl('', [Validators.required])
      }, {validators: comparePassword}),
      termCheck: new FormControl(false, Validators.requiredTrue)
    })
  }

  register() {
    this.submitted = true;
    let registered = false;
    this.http.get<any>(API_AUTH.USER1).subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.registerForm.value['email']
      })
      if (user) {
        registered = true;
      }
      if (registered) {
        this.commonService.toastAlert("email này đã được đăng kí trước đó! xin vui lòng xử dụng email khác!!")
      } else if (!this.registerForm.hasError('passwordnotmatch', ['pw']) && this.registerForm.value['termCheck'] == true) {
        this.authService.register(this.registerForm.value['email'], this.registerForm.controls['pw'].value.password).subscribe(res => {
          this.commonService.toastSuccess("Đăng kí thành công thành công! Đã gửi mã kích hoạt đến mail của bạn! vui lòng check mail để kích hoạt tài khoản!")

          this.router.navigate(['signin']);
        }, error => {
          this.commonService.toastError("Đăng kí thất bại!! Xin vui lòng thử lại")
        })
      }
    },error => {
      this.commonService.toastError("Đăng kí thất bại!! Xin vui lòng thử lại")
    })
  }
}
