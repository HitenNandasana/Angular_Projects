import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth/auth.service';

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

  constructor(private fb: FormBuilder,
    private route: Router,
    private authservice: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    if (confirm('Are yor sure you want Logout?')) {
      this.authservice.loggedIn.next(false);
      localStorage.removeItem('LoginUser');
      this.route.navigate(['']);
    }
  }

}
