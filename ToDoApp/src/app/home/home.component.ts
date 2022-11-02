import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private todoservice: TodosService) {
    this.todoservice.key.next('home');
  }

  ngOnInit(): void {
  }

}
