import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogBoxComponent } from './pages/form/dialog-box/dialog-box.component';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'form',
    title: 'Form',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
