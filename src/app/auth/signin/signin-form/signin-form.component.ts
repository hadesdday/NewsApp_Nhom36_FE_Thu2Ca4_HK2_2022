import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../../_service/auth.service";
import { TokenStorageService } from "../../../_service/token-storage.service";

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
        email: new FormControl("", [Validators.required,Validators.email]),
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
        return a.email === this.siginForm.value.email && a.password === this.siginForm.value.password
      })
      if (user) {
        this.tokenStorage.saveUser(user);
        console.log(user);
        alert("login success")
        localStorage.setItem("isSignin","true");
        this.isLoggedIn = true;
        this.siginForm.reset();
        this.router.navigate(['home'])
      }else{
        alert("login false")
      }
    })


  }
}
