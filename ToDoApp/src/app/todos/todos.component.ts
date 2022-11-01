import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoList: any;
  temp: any;
  editMode: any;
  activeCount = 0;
  completedCount = 0;

  constructor(private route: Router, private todoservice: TodosService, private toastr: ToastrService) {
    this.temp = /list/.test(window.location.href) ? 'todo' : (/active/.test(window.location.href) ? 'active' : 'completed');

    this.todoservice.editMode.subscribe(res => {
      this.editMode = res;
    })
  }

  ngOnInit(): void {
    this.todoList = this.todoservice.getTodos();

    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].status) {
        this.completedCount++;
      } else {
        this.activeCount++;
      }

    }
  }
  editTodo(todo: any) {
    this.todoservice.editMode.next(true);
    this.todoservice.todoObj.next(todo);
    this.route.navigate([`todo/edit`, todo.id]);
  }

  deleteTodo(index: any) {
    this.completedCount--;
    this.activeCount--;
    this.todoservice.deleteTodo(index);
    this.todoList = this.todoservice.getTodos();
    this.toastr.success('To-Do Deleted Successfully!');
  }

  checkedTodo(id: any, status: any) {
    this.completedCount--;
    this.activeCount--;
    this.todoservice.checkedTodo(id, status);
    this.todoList = this.todoservice.getTodos();
    if (!status) {
      this.toastr.success('To-Do Completed!');
    }
  }

}
