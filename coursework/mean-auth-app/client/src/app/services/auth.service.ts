import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:5000/users/register';
  private loginUrl = 'http://localhost:5000/users/authenticate';
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
      tap((_) => console.log('moi')),
      catchError((err) => {
        return [err.error];
      })
    );
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
