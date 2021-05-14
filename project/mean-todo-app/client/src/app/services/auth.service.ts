import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface IUser {
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:5000/api/users/register';
  private loginUrl = 'http://localhost:5000/api/users/authenticate';
  private todoUrl = 'http://localhost:5000/api/todos';

  authToken!: string | null;
  user: IUser | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  registerUser(user: {
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }) {
    return this.http.post(this.registerUrl, user, this.httpOptions);
  }

  authenticateUser(user: { username: string; password: string }) {
    return this.http.post(this.loginUrl, user, this.httpOptions).pipe(
      catchError((err) => {
        return [err.error];
      })
    );
  }

  storeUserData(token: string, user: IUser) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUserTodos() {
    this.loadToken();

    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      }),
    };

    return this.http.get(this.todoUrl, authHeader);
  }
}
