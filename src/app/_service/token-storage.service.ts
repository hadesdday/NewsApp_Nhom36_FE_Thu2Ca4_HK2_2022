import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

const REMEMBER_KEY = 'remember-token';
const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router) {
  }

  signOut(): void {

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("isSignin");
    this.router.navigate(['/signin']);
  }

  // public saveToken(token: string): void {
  //   localStorage.removeItem(TOKEN_KEY);
  //   localStorage.setItem(TOKEN_KEY, token);
  // }
  //
  // public getToken(): string | null {
  //   return localStorage.getItem(TOKEN_KEY);
  // }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public rememberAccount(account: any): void {
    localStorage.setItem(REMEMBER_KEY, JSON.stringify(account));
  }

  public getRememberAccount(): any {
    const account = localStorage.getItem(REMEMBER_KEY);
    if (account) {
      return JSON.parse(account)
    }
    return {}
  }

  public deleteRememberInfo(): void {
    localStorage.removeItem(REMEMBER_KEY);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user)
    }
    return {}
  }

  public isSignin(): any {
    return localStorage.getItem("isSignin") == "true"
  }
}
