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
    console.log(user);

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

  validateEmail(email: string | undefined) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && re.test(email)) {
      return true;
    } else {
      return false;
    }
  }
}
