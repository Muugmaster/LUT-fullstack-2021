import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  showNotification(msg: string, type: string, timeout: number, show?: boolean) {
    this.show = true || show;
    this.message = msg;
    this.type = type;
    setTimeout(() => {
      this.show = false;
    }, timeout);
  }

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
        this.router.navigate(['/']);
      } else {
        this.showNotification(
          data.message ? data.message : 'Something went wrong',
          'danger',
          3000
        );
        this.clearForm();
      }
    });
  }
}
