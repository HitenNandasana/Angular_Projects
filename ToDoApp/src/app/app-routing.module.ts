import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivetodosComponent } from './activetodos/activetodos.component';
import { CompletedtodosComponent } from './completedtodos/completedtodos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'todos',
    title: 'To-Do',
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)
  },
  {
    path: 'activeTodos',
    title: 'Active To-Do',
    component: ActivetodosComponent
  },
  {
    path: 'completedTodos',
    title: 'Completed To-Do',
    component: CompletedtodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
