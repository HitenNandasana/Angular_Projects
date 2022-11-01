import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUpdateTodoComponent } from './add-update-todo/add-update-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { ReactiveFormsModule } from '@angular/forms';


const route: Routes = [
  {
    path: 'list',
    component: TodosComponent
  },
  {
    path: 'active',
    component: TodosComponent
  },
  {
    path: 'completed',
    component: TodosComponent
  },
  {
    path: 'add',
    component: AddUpdateTodoComponent
  },
  {
    path: 'edit/:id',
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
export class TodosModule {

}
