import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(
    private authService: AuthService,
    private validate: ValidateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Check fields
    if (!this.validate.validateUserRegister(user)) {
      console.log('fill fields');
      return false;
    }

    // Check email
    if (!this.validate.validateEmail(user.email!)) {
      console.log('email is wrong');
      return false;
    }

    console.log('oo jee');
    return true;
  }
}
