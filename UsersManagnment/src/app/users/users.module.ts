import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './add-update-users/adduser.component';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    title: 'Users',
    component: UsersComponent
  },
  {
    path: 'add',
    title: 'Add User',
    component: AdduserComponent
  },
  {
    path: 'edit/:id',
    title: 'Edit User',
    component: AdduserComponent
  },
]

@NgModule({
  declarations: [UsersComponent, AdduserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class UsersModule {
  constructor() {
    console.log('users loaded');

  }
}
