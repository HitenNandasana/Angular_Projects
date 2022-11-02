import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  editMode = new BehaviorSubject(false);
  todoObj = new BehaviorSubject('');
  key = new BehaviorSubject('');

  constructor() { }

  setTodos(data: any) {
    localStorage.setItem('todos', JSON.stringify(data));
  }

  getTodos() {
    let data = JSON.parse(localStorage.getItem('todos') || '');
    return data;
  }

  editTodo(todoObj: any, data: any) {
    let arr = data.map((obj: any) => {
      if (obj.id === todoObj.id) {
        return todoObj;
      }
      return obj;
    })
    this.setTodos(arr);
    this.todoObj.next('');
    this.editMode.next(false);
  }

  deleteTodo(i: any) {
    if (confirm('Do you really want to Delete this?')) {
      let data = this.getTodos();
      data.splice(i, 1);
      this.setTodos(data);
    }
  }

  checkedTodo(id: any, status: any) {
    let data = this.getTodos();
    let arr = data.map((obj: any) => {
      if (obj.id === id) {
        return { ...obj, status: status ? false : true }
      }
      return obj;
    })
    this.setTodos(arr);
  }
}
