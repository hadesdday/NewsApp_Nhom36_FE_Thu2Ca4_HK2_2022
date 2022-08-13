import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../_model/user";
import { API_AUTH } from '../_api/apiURL';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

    return this.http.post<any>(API_AUTH.USER, {
      "email": email,
      "password": password,
      "phone": null,
      "address": null,
      "dateBirth": null,
      "gender": null,
    }, httpOptions);
  }
}
