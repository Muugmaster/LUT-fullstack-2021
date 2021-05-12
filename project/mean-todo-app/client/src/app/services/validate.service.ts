import { Injectable } from '@angular/core';

interface IUser {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateUserRegister(user: IUser) {
    const { username, email, password } = user;

    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
}
