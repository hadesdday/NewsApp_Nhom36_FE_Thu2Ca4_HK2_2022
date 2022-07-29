import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';

export function generateToken() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var token = []
  for (let i = 0; i < 10; i++) {
    token.push(chars[Math.floor(Math.random() * chars.length)])
  }
  return token.join("");
}

@Component({
  selector: 'app-recover-pass-form',
  templateUrl: './recover-pass-form.component.html',
  styleUrls: ['./recover-pass-form.component.scss']
})


export class RecoverPassFormComponent implements OnInit {
  public recoverForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {

    this.recoverForm = this.formBuilder.group({
      recovery_email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  recover() {
    emailjs.init("aguJ3ZJ1XwxnQhJBl");
    this.http.get<any>("http://localhost:3000/user").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.recoverForm.value.recovery_email
      })
      var token=generateToken();
      user['recoveryToken']=token;
      this.http.put("http://localhost:3000/user/" + user.id, user).subscribe(res => {
        alert("add token")
      })

      const recoveryURL = "http://localhost:4200/change-password?email=" + user.email + "&token=" + token;
      const templateParams = {
        to_name: user.name,
        from_name: 'hoang',
        message: "Chào bạn\n" + "Chúng tôi có nhận được yêu cầu thiết lập lại mật khẩu cho tài khoản của bạn."
          + "\n" + "Nhấn đường link này[" + recoveryURL + "] để thiết lập mật khẩu mới cho tài khoản của bạn.\n" +
          "Hoặc vui lòng copy và dán đường dẫn bên dưới lên trình duyệt:[" + recoveryURL + "]\n"
          + "Nếu bạn không yêu cầu thiết lập lại mật khẩu, vui lòng liên hệ Bộ phận chăm sóc khách hàng của chúng tôi.\n" +
          "Trân trọng,\n" + "Đội ngũ NLU",
        to_email: user.email
      };
      emailjs.send('service_x24s21g', 'template_39uqi6o', templateParams)
        .then(function (response) {

          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });
      console.log(user)
      alert("success")
    });

  }
}
