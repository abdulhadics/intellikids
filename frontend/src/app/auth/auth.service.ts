import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService
  ) {

    this.autoLogin()
  }
  user: any;
  signIn(identifier: string | Blob, password: string | Blob) {
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);
    return this.http.post<any>(`auth/local`, formData);
  }

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  refreshInfo() {
    this.me().subscribe(userinfo => {
      const item = localStorage.getItem("user");
      const user = item ? JSON.parse(item) : [];
      user.user = userinfo;
      this.setUser(user);
    })
  }

  autoLogin() {
    const txt = localStorage.getItem('user');
    if (txt) {
      const user = JSON.parse(txt);
      if (!user) {
        return;
      }
      this.setUser(user);
    }
  }

  signOut() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['']);
  }

  forgotPassword(email : any) {
    const formData = new FormData();
    formData.append('email', email);
    return this.http.post<any>(`auth/forgot-password`, formData);
  }

  resetPassword(code : any, newPassword : any, confirmNewPassword: any) {
    const formData = new FormData();
    formData.append('code', code);
    formData.append('password', newPassword);
    formData.append('passwordConfirmation', confirmNewPassword);
    return this.http.post<any>(`auth/reset-password`, formData);
  }

  signUp(firstName : any, lastName : any, email : any, password : any, grade: any) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', email);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('grade', grade);
    return this.http.post<any>(`auth/local/register`, formData);
  }

  me() {
    return this.http.get('users/me?populate=*');
  }

  handleError(errorObject: any) {
    return this._errorService.handleError(errorObject)
  }
  
}
