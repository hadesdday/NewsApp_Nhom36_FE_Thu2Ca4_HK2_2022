import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../../_service/token-storage.service";
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
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
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
  changePassword() {
    this.submitted = true;
    if (this.currentUser.password != this.changePassForm.value.oldPass) {
      this.isWrongPass = true;
    } else {
      this.isWrongPass = false;
      if (!this.changePassForm.hasError('passwordnotmatch', ['new_pw'])) {
        this.currentUser.password = this.changePassForm.controls['new_pw'].value.newPass;
        this.http.put("http://localhost:3000/user/" + this.currentUser.id, this.currentUser).subscribe(res => {
          alert("change success")
          this.tokenStorage.saveUser(this.currentUser);
          this.currentUser = this.tokenStorage.getUser();
          console.log(this.currentUser)
          this.router.navigate(["profile"])
          this.submitted = false;
        })
      }
    }
  }
}
