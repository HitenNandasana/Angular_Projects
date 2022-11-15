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

  sideNav = ['Dashboard', 'Income', 'Expense', 'Category'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
