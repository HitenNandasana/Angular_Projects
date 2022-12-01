import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoriesComponent } from './categories.component';
import { MatModule } from 'src/app/appModules/mat.module';
import { AddUpdateCategoryComponent } from './add-update-category/add-update-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IncomeComponent,
    ExpenseComponent,
    CategoriesComponent,
    AddUpdateCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class CategoriesModule {
  constructor() {
    console.log('category module run');
  }
}
