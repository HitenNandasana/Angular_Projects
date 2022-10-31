import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUpdateTodoComponent } from './add-update-todo/add-update-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { ReactiveFormsModule } from '@angular/forms';


const route: Routes = [
  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'add',
    component: AddUpdateTodoComponent
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    AddUpdateTodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class TodosModule { }
