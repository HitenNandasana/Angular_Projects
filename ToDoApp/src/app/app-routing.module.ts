import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo/home',
    pathMatch: 'full'
  },
  {
    path: 'todo/home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'todo',
    title: 'To-Do',
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)
  },
  {
    path: '**',
    redirectTo: 'todo/home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
