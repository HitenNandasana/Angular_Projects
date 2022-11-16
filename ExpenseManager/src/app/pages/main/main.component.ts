import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  options = this.fb.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  sideNav = [
    {
      path: 'dashboard',
      name: 'Dashboard'
    },
    {
      path: 'category/income',
      name: 'Income'
    },
    {
      path: 'category/expense',
      name: 'Expense'
    },
    {
      path: 'category',
      name: 'Category'
    },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
