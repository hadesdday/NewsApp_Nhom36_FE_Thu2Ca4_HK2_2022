import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_model/user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: any, password: any): Observable<any> {
    return this.http.post("http://localhost:3000/login", {
      username,
      password
    }, httpOptions);
  }

  register(username: any, password: any): Observable<any> {
    var email = null;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(username)) {
      email = username;
    }

    return this.http.post<any>('http://localhost:3000/user', {
      "username": username,
      "email": email,
      "password": password,
      "phone": null,
      "address": null,
      "dateBirth": null,
      "gender": null,
    }, httpOptions);
  }
}
