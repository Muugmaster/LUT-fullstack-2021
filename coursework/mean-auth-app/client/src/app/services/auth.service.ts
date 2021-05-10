import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:5000/users/register';
  private loginUrl = 'http://localhost:5000/users/authenticate';
  private profileUrl = 'http://localhost:5000/users/profile';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(this.registerUrl, user, this.httpOptions);
  }

  authenticateUser(user: any) {
    return this.http.post(this.loginUrl, user, this.httpOptions).pipe(
      catchError((err) => {
        return [err.error];
      })
    );
  }

  getProfile() {
    this.loadToken();
    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      }),
    };
    return this.http.get(this.profileUrl, authHeader);
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
