import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'user',
    title: 'User',
    component: UserComponent
  },
  {
    path: 'employee',
    title: 'Employee',
    component: EmployeeComponent
  },
  {
    path: 'admin',
    title: 'Admin',
    component: AdminComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
