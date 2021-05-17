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

  todo: string | undefined;
  confirm: boolean | undefined;

  editTodo: string | undefined;
  editTodoId: string | undefined;
  editTodoConfirm: boolean | undefined;

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
        this.todos = undefined;
        return false;
      }
    );
  }

  getTodo(id: string) {
    console.log('id', id);
    return this.authService.getOneUserTodo(id).subscribe((data: any) => {
      console.log(data);
      this.editTodo = data.todo.todo;
      this.editTodoId = data.todo.id;
      this.editTodoConfirm = data.todo.confirm;
    });
  }

  addTodo() {
    const todo = {
      todo: this.todo,
      confirm: false,
    };

    return this.authService.addTodo(todo).subscribe((data) => {
      console.log(data);
      this.todo = undefined;
      this.getTodos();
    });
  }

  delTodo(id: string) {
    console.log('delId', id);
    return this.authService.delTodo(id).subscribe((data) => {
      this.getTodos();
    });
  }

  confirmTodo(id: string) {
    console.log('id', id);
    return this.authService.getOneUserTodo(id).subscribe((data: any) => {
      console.log(data.todo);

      const updatedTodo = {
        todo: data.todo.todo,
        confirm: !data.todo.confirm,
      };

      this.authService.confirmTodo(updatedTodo, id).subscribe((upData: any) => {
        console.log('put', upData);
        this.getTodos();
      });
    });
  }

  updateTodo() {
    console.log('id', this.editTodoId);

    const updatedTodo = {
      todo: this.editTodo,
      confirm: this.editTodoConfirm,
    };

    this.authService
      .confirmTodo(updatedTodo, this.editTodoId!)
      .subscribe((data) => {
        console.log('update   ', data);
        this.editTodo = undefined;
        this.editTodoId = undefined;
        this.editTodoConfirm = undefined;
        this.getTodos();
      });
  }
}
