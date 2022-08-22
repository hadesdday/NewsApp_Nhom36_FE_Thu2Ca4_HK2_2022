import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../_service/auth.service";
import {TokenStorageService} from "../../../_service/token-storage.service";
import {API_AUTH} from 'src/app/_api/apiURL';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  public siginForm !: FormGroup;
  rememberAccount: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.rememberAccount = this.tokenStorage.getRememberAccount()

    this.siginForm = this.formBuilder.group({
      email: new FormControl(this.rememberAccount.email, [Validators.required, Validators.email]),
      password: new FormControl(this.rememberAccount.password, [Validators.required]),
      rememberCheck: new FormControl(this.rememberAccount!={})
    })
  }

  sigin() {
    this.authService.login(this.siginForm);
  }
}
