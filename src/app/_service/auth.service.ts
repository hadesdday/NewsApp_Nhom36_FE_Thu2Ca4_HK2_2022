import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {User} from "../_model/user";
import {generateToken} from "../auth/signin/recover-pass-form/recover-pass-form.component";
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {API_AUTH} from "../_api/apiURL";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {CommonService} from "./common.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router, private commonService: CommonService) {
  }

  login(siginForm: any) {
    this.http.get<any>(API_AUTH.USER).subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === siginForm.value.email && a.password === siginForm.value.password
      })
      if (user) {
        if (user.comfirmToken === "ok") {
          this.tokenStorage.saveUser(user);
          console.log(user);
          localStorage.setItem("isSignin", "true");
          siginForm.reset();
          this.router.navigate(['home'])
        } else {
          this.router.navigate(['non-active', siginForm.value.email])
        }
      } else {
        this.commonService.toastError("Tài khoản không tồn tại hoặc sai mật khẩu!!")
      }
    })

  }

  register(email: any, password: any): Observable<any> {

    let token = generateToken()
    this.sendActivatedKey(email, token)
    return this.http.post<any>('http://localhost:3000/user', {
      "email": email,
      "password": password,
      "phone": null,
      "address": null,
      "dateBirth": null,
      "gender": null,
      "comfirmToken": token,
    });

  }

  sendActivatedKey(email: any, token: any) {


    let isSended = false;
    const confirmURL = "http://localhost:4200/confirm-register?email=" + email + "&token=" + token;
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
        isSended = true;
      }, function (error) {
        console.log('FAILED...', error);
      });
    if (isSended) {
      this.commonService.toastSuccess("Đã gửi mã kích hoạt đến mail của bạn! vui lòng check mail để kích hoạt tài khoản!")
    } else
      this.commonService.toastError("Đã xáy ra lỗi khi gửi mail! xin vui lòng thử lại")
  }
}
