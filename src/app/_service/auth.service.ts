import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  login( username: any, password: any): Observable<any> {
    return this.http.post("http://localhost:3000/user", {
      "username": username,
      "password": password
    }, httpOptions);
  }
  register( username: any, password: any ): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user', {
      "username": username,
      "password": password
    }, httpOptions);
  }
}
