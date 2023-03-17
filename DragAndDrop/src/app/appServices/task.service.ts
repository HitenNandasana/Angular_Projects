import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  setTaskData(data: any) {
    localStorage.setItem('List', JSON.stringify(data));
  }

  getTaskData() {
    return JSON.parse(localStorage.getItem('List') || '');
  }
}
