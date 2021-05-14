import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserTodos().subscribe(
      (data: any) => {
        console.log(data.todos);
        this.todos = data.todos;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
