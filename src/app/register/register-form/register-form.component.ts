import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl(),
      pw: this.formBuilder.group({
        password: new FormControl('', [Validators.required]),
        re_password: new FormControl('', [Validators.required])
      }, {validators: comparePassword}),
      termCheck: new FormControl(false, Validators.requiredTrue)
    })
  }

  register() {
    let neededValue = {}
    alert(this.submitted)
    this.submitted = true;
    alert(this.registerForm.value['termCheck'])
    if (this.registerForm.value['password'] === this.registerForm.value['re_password']) {
      neededValue = {
        "username": this.registerForm.value['username'],
        "password": this.registerForm.value['username'],
        "email": null
      }
    }
    this.http.post<any>("http://localhost:3000/user", neededValue).subscribe(res => {

      if (!this.registerForm.hasError('passwordnotmatch', ['pw']) && this.registerForm.value['termCheck'] == true) {
        alert("register success");
        this.registerForm.reset();
        this.router.navigate(['signin']);
      } else {
        alert("register false 2")
      }
    }, err => {
      alert("register false"+err.value);
    })
  }
}
