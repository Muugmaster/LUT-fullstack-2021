import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:5000/api/users/register';
  private loginUrl = 'http://localhost:5000/api/users/authenticate';

  authToken: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(this.registerUrl, user, this.httpOptions);
  }

  authenticateUser(user: { username: string; password: string }) {
    return this.http.post(this.loginUrl, user, this.httpOptions).pipe(
      catchError((err) => {
        return [err.error];
      })
    );
  }
}
