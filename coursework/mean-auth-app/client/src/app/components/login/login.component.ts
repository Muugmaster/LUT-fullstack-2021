import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: String | undefined;
  password: String | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe((data: any) => {
      console.log(data);
      if (data && data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in!', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(data.error, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
