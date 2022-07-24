import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../_service/auth.service";
import {TokenStorageService} from "../../_service/token-storage.service";

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  public siginForm !: FormGroup;
  isLoggedIn = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.siginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      rememberCheck: new FormControl("")
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  sigin() {
    this.http.get<any>("http://localhost:3000/user").subscribe(res => {
      const user = res.find((a: any) => {
        return a.username === this.siginForm.value.username && a.password === this.siginForm.value.password
      })
      if (user) {
        this.tokenStorage.saveUser(user);
        console.log(user);
        alert("login success")
        this.isLoggedIn = true;
        this.siginForm.reset();
        alert(this.tokenStorage.getUser().username)
        this.router.navigate(['home'])
      }
    })

    // this.authService.login(this.siginForm.value['username'],this.siginForm.value.password).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.accessToken);
    //     console.log(data.accessToken)
    //     console.log(data)
    //     this.tokenStorage.saveUser(data);
    //     this.isLoggedIn = true;
    //     alert("login success")
    //     alert(this.tokenStorage.getUser().username)
    //     this.router.navigate(['home'])
    //
    //   },
    //   err => {
    //     // this.errorMessage = err.error.message;
    //     // this.isLoginFailed = true;
    //     alert("login fail")
    //     console.log(err.error.message)
    //   }
    // );
  }
}
