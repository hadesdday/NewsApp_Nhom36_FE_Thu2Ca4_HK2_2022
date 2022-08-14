import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_model/user";
import {generateToken} from "../auth/signin/recover-pass-form/recover-pass-form.component";
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {API_AUTH} from "../_api/apiURL";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post(API_AUTH.LOGIN, {
      email,
      password
    }, httpOptions);
  }

  register(email: any, password: any): Observable<any> {
    // var email = null;
    // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (re.test(username)) {
    //   email = username;
    // }
    let token=generateToken()

    alert(email)
    const confirmURL = "http://localhost:4200/confirm-register?email=" +email + "&token=" + token;
    emailjs.init("aguJ3ZJ1XwxnQhJBl");
    const templateParams = {
      to_name: email,
      from_name: 'hoang',
      message: "Chào bạn\n" + "Bạn vừa tạo một tài khoản trên trang web của chúng tôi."
        + "\n" + "Nhấn đường link này[" + confirmURL + "] để kích hoạt tài khoản của bạn.\n" +
        "Hoặc vui lòng copy và dán đường dẫn bên dưới lên trình duyệt:[" + confirmURL + "]\n"
        + "Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua tin nhắn này hoặc liên hệ bộ phần chăm sóc khách hàng.\n" +
        "Trân trọng,\n" + "Đội ngũ NLU",
      to_email: email
    };
    emailjs.send('service_x24s21g', 'template_n4y5t2w', templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('FAILED...', error);
      });
    return this.http.post<any>('http://localhost:3000/user', {
      "email": email,
      "password": password,
      "phone": null,
      "address": null,
      "dateBirth": null,
      "gender": null,
      "comfirmToken":token,
    }, httpOptions);

  }
}
