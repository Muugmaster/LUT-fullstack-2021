import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: any;

  title: string | undefined;
  description: string | undefined;
  confirm: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
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

  confirmTodo(id: string) {
    console.log('id', id);
    return this.authService.getOneUserTodo(id).subscribe((data: any) => {
      console.log(data.todo);

      const updatedTodo = {
        title: data.todo.title,
        description: data.todo.description,
        confirm: !data.todo.confirm,
      };

      this.authService.confirmTodo(updatedTodo, id).subscribe((upData: any) => {
        console.log('put', upData);
        this.getTodos();
      });
    });
  }
}
