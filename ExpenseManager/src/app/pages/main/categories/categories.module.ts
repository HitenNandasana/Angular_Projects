import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';


@NgModule({
  declarations: [
    IncomeComponent,
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
