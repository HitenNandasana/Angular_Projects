import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  categoryId: any;
  editCategoryObj: any;

  constructor(private fb: FormBuilder,
    public location: Location,
    private categoryservice: CategoryService,
    public datepipe: DatePipe,
    private activateroute: ActivatedRoute
  ) {
    this.activateroute.paramMap.subscribe(param => {
      this.categoryId = param.get('id');
    });
    this.categoryservice.editCategoryObj.subscribe(res => {
      this.editCategoryObj = res;
    })
  }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      'type': [this.categoryId ? this.editCategoryObj.type : 'income', Validators.required],
      'category': [this.categoryId ? this.editCategoryObj.category : '', Validators.required],
      'amount': [this.categoryId ? this.editCategoryObj.amount : '', Validators.required]
    })
    this.select();
  }

  categoryIncomeOptions: string[] = ['Salary', 'Rent', 'Deposit', 'Saving'];
  categoryExpenseOptions: string[] = ['Food', 'Fuel', 'Grocery', 'Eletronics', 'Travel', 'Shopping', 'Medical', 'Movie', 'Other'].sort();

  select() {
    if (this.addCategoryForm.value.type === 'income') {
      this.category = this.categoryIncomeOptions;
    } else {
      this.category = this.categoryExpenseOptions
    }
  }
  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  add() {
    this.submit = true;
    if (this.addCategoryForm.valid) {
      let today = new Date();
      if (!this.categoryId) {
        let obj = {
          date: today.toString(),
          type: this.addCategoryForm.get('type').value,
          category: this.addCategoryForm.get('category').value,
          amount: this.addCategoryForm.get('amount').value,
        }
        this.categoryservice.add(obj);
      } else if (this.categoryId) {

        let obj = {
          id: this.categoryId,
          date: today.toString(),
          type: this.addCategoryForm.get('type').value,
          category: this.addCategoryForm.get('category').value,
          amount: this.addCategoryForm.get('amount').value,
        }
        this.categoryservice.update(obj);
      }
      this.submit = false;
    }
  }

}
