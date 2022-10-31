import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  setTodos(data: any) {
    localStorage.setItem('todos', JSON.stringify(data));
  }

  getTodos() {
    let data = JSON.parse(localStorage.getItem('todos') || '');
    return data;
  }

  deleteTodo(i: any) {
    let data = this.getTodos();
    data.splice(i, 1);
    this.setTodos(data);
  }
}
