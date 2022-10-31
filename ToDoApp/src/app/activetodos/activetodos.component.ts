import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-activetodos',
  templateUrl: './activetodos.component.html',
  styleUrls: ['./activetodos.component.css']
})
export class ActivetodosComponent implements OnInit {

  todoList: any;

  constructor(private route: Router, private todoservice: TodosService, private toastr: ToastrService) {
    this.todoList = this.todoservice.getTodos();
  }

  ngOnInit(): void {
  }

  deletetodo(index: any) {
    this.todoservice.deleteTodo(index);
    this.todoList = this.todoservice.getTodos();
    this.toastr.success('To-Do Deleted Successfully!');
  }

  checkedTodo(id: any, status: any) {
    let data = this.todoservice.getTodos();

    let arr = data.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, status: status ? false : true }
      }
      return obj;
    })
    this.todoservice.setTodos(arr);
    this.todoList = this.todoservice.getTodos();
    if (!status) {
      this.toastr.success('To-Do Completed!');
    }
  }

}
