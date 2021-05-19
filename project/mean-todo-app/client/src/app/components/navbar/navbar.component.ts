import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    public alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onLogoutClick() {
    this.authService.logout();

    this.router.navigate(['/login']);
    this.alertService.success('You are logged out!', this.options);

    return false;
  }
}
