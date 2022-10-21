import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { RoutingComponent } from './routing.component';

const empRoute: Routes = [
  { path: '', title: 'Routing', component: RoutingComponent },
  { path: 'emp-detail', title: 'Details', component: EmpDetailsComponent }
]

@NgModule({
  declarations: [EmpDetailsComponent, RoutingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(empRoute)
  ]
})
export class RoutingModule {
  constructor() {
    console.log('route loaded');
  }
}
