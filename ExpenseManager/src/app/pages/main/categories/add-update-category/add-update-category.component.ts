import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss']
})
export class AddUpdateCategoryComponent implements OnInit {

  category: any;
  addCategoryForm: FormBuilder | any;
  submit: boolean = false;

  constructor(private fb: FormBuilder,
    public location: Location,
    private route: Router) { }


  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      'type': ['income', Validators.required],
      'category': ['', Validators.required],
      'amount': ['', Validators.required]
    })
    this.select();
  }

  categoryIncomeOptions: string[] = ['Salary', 'Rent', 'Deposit'];
  categoryExpenseOptions: string[] = ['Food', 'Fuel', 'Grocery', 'Eletronics', 'Other'];

  select() {
    if (this.addCategoryForm.value.type === 'income') {
      this.category = this.categoryIncomeOptions;
    } else {
      this.category = this.categoryExpenseOptions
    }
  }

  add() {
    this.submit = true;
    if (this.addCategoryForm.valid) {
      console.log(this.addCategoryForm);

      this.route.navigate(['main/category']);
    }
  }

}
