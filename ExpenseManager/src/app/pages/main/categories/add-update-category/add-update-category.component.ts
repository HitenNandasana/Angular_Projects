import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/appServices/category/category.service';

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
    private categoryservice: CategoryService,
    public datepipe: DatePipe
  ) { }

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
      let date = new Date();
      let today = this.datepipe.transform(date, 'dd-MM-yyyy')
      let obj = {
        date: today,
        type: this.addCategoryForm.get('type').value,
        category: this.addCategoryForm.get('category').value,
        amount: this.addCategoryForm.get('amount').value,
      }
      this.categoryservice.add(obj);
    }
  }

}
