import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodosService } from '../todos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-todo',
  templateUrl: './add-update-todo.component.html',
  styleUrls: ['./add-update-todo.component.css']
})
export class AddUpdateTodoComponent implements OnInit {

  addUpdateToDoForm: FormBuilder | any;
  id: any;
  submit = false;
  editMode: any;
  todoObj: any;

  constructor(private fb: FormBuilder, private todoservice: TodosService, private route: Router, private toastr: ToastrService) {
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') == undefined) {
      let todosList: any = [];

      this.todoservice.setTodos(todosList);
      return;
    }
    this.todoservice.editMode.subscribe(res => {
      this.editMode = res;
    })
    this.todoservice.todoObj.subscribe(res => {
      this.todoObj = res;
    })
  }

  ngOnInit(): void {
    this.addUpdateToDoForm = this.fb.group({
      'title': [this.editMode ? this.todoObj.title : '', Validators.required],
      'description': [this.editMode ? this.todoObj.description : '', Validators.required],
    })
  }

  onSubmit() {
    this.submit = true;
    if (this.addUpdateToDoForm.valid) {
      let data = this.todoservice.getTodos();
      if (!this.editMode) {
        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((todo: any) => todo.id)) + 1;
        }
        let obj = {
          id: this.id,
          title: this.addUpdateToDoForm.value.title.replace(/\s+/g, ' ').trim(),
          description: this.addUpdateToDoForm.value.description.replace(/\s+/g, ' ').trim(),
          date: Date(),
          status: false
        }
        data.push(obj);
        this.todoservice.setTodos(data);
        this.toastr.success('To-Do added successfully!');
      }
      else {
        let obj = {
          id: this.todoObj.id,
          title: this.addUpdateToDoForm.value.title.replace(/\s+/g, ' ').trim(),
          description: this.addUpdateToDoForm.value.description.replace(/\s+/g, ' ').trim(),
          date: this.todoObj.date,
          status: this.todoObj.status
        }
        this.todoservice.editTodo(obj, data);
        this.toastr.success('To-Do Updated successfully!');
      }
      this.route.navigate(['/todo/list']);
    }
  }
}
