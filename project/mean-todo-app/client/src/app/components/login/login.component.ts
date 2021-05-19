import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  show!: boolean;
  message!: string;
  type!: string;

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {}

  clearForm() {
    this.username = '';
    this.password = '';
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe((data) => {
      console.log(data);
      if (data && data.success) {
        console.log('LOGGED IN');
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
        this.alertService.success('You are logged in!', this.options);
      } else {
        this.alertService.error(
          data.message ? data.message : 'Something went wrong!',
          this.options
        );
      }
    });
  }
}
