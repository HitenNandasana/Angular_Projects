import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../todos.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update-todo',
  templateUrl: './add-update-todo.component.html',
  styleUrls: ['./add-update-todo.component.css']
})
export class AddUpdateTodoComponent implements OnInit {

  addUpdateToDoForm: FormBuilder | any;
  id: any;
  submit = false;
  todoObj: any;
  todoId: any;

  constructor(private fb: FormBuilder,
    private todoservice: TodosService,
    private toastr: ToastrService,
    public location: Location,
    public activeRoute: ActivatedRoute) {

    this.todoservice.todoObj.subscribe(res => {
      this.todoObj = res;
    })
    this.activeRoute.paramMap.subscribe(res => {
      this.todoId = res.get('id');
    })
  }

  ngOnInit(): void {
    this.addUpdateToDoForm = this.fb.group({
      'title': [this.todoId ? this.todoObj.title : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'description': [this.todoId ? this.todoObj.description : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
    })
  }

  onSubmit() {
    this.submit = true;
    if (this.addUpdateToDoForm.valid) {
      let data = this.todoservice.getTodos();
      if (!this.todoId) {
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
      this.location.back();
    }
  }

}
