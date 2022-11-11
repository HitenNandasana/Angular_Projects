import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoApp';

  constructor(private route: Router, private todoservice: TodosService) {
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') == undefined) {
      let todosList: any = [];

      this.todoservice.setTodos(todosList);
      return;
    }
  }

}
