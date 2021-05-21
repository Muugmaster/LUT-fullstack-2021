import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username!: string | undefined;
  email!: string | undefined;
  password!: string | undefined;

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  constructor(
    private authService: AuthService,
    private validate: ValidateService,
    private router: Router,
    public alertService: AlertService
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
      // console.log('fill fields');
      this.alertService.error('Please fill all fields!', this.options);
      return false;
    }

    // Check email
    if (!this.validate.validateEmail(user.email)) {
      // console.log('email is wrong');
      this.alertService.error('Check email address!', this.options);
      return false;
    }

    return this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        this.router.navigate(['/login']);
        this.alertService.success(
          'You have been registered successfully!',
          this.options
        );
      } else {
        this.router.navigate(['/register']);
        this.alertService.success('Something went wrong!', this.options);
      }
    });
  }
}
