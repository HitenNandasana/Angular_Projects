import { NotExpr } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/appServices/category/category.service';
import { CategoryData } from 'src/app/models/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public dashboardList!: CategoryData[];
  public incomeList!: CategoryData[];
  public expenseList!: CategoryData[];
  temp: boolean = false;
  value: any;
  income !: number;
  expense !: number;
  balance !: number;
  displayedColumns: string[] = ['category', 'amount', 'date', 'actions'];
  incomeDataSource!: MatTableDataSource<CategoryData>;
  expenseDataSource!: MatTableDataSource<CategoryData>;

  // @ViewChild('incomepaginator') incomepaginator!: MatPaginator;
  @ViewChild('incomesort', { static: true }) incomesort!: MatSort;
  // @ViewChild('expensepaginator') expensepaginator!: MatPaginator;
  @ViewChild('expensesort', { static: true }) expensesort!: MatSort;

  constructor(
    private categoryservice: CategoryService,
    private route: Router
  ) {
    this.getList();
  }

  applyFilter(event: Event, str: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (str === 'income') {
      this.incomeDataSource.filter = filterValue.trim().toLowerCase();

      if (this.incomeDataSource.paginator) {
        this.incomeDataSource.paginator.firstPage();
      }
    } else {
      this.expenseDataSource.filter = filterValue.trim().toLowerCase();

      if (this.expenseDataSource.paginator) {
        this.expenseDataSource.paginator.firstPage();
      }
    }
  }

  edit(data: any) {
    this.categoryservice.editCategoryObj.next(data);
    this.route.navigate(['main/category/edit', data.id]);
  }

  delete(data: any) {
    if (confirm('Do you really want to Delete this?')) {
      this.categoryservice.delete(data);
      this.getList();
    }
  }

  async getList() {
    let dashboard: CategoryData[];
    await this.categoryservice.getCategoryData().then(value => {
      dashboard = value as CategoryData[];
      this.dashboardList = dashboard;

      // this.income = this.dashboardList.filter(res =>
      //   res.type === 'income').reduce((pre, next) => pre + next.amount, 0);
      // this.expense = this.dashboardList.filter(res =>
      //   res.type === 'expense').reduce((pre, next) => pre + next.amount, 0);

      this.incomeList = this.dashboardList.filter(res =>
        res.type === 'income');
      this.expenseList = this.dashboardList.filter(res =>
        res.type === 'expense');

      this.income = this.incomeList.reduce((pre, next) => pre + next.amount, 0);
      this.expense = this.expenseList.reduce((pre, next) => pre + next.amount, 0);
      this.balance = this.income - this.expense;

      this.categoryservice.id.next(this.dashboardList[this.dashboardList.length - 1].id);
    }).catch(error => {
      // console.log(error);
      this.temp = true
    })
    let recentIncomeList = this.incomeList.slice(-5);
    let recentExpenseList = this.expenseList.slice(-5);
    this.incomeDataSource = new MatTableDataSource(recentIncomeList);
    this.incomeDataSource.sort = this.incomesort;

    this.expenseDataSource = new MatTableDataSource(recentExpenseList);
    this.expenseDataSource.sort = this.expensesort;
  }

  sortDate(str: string) {
    if (str === 'income') {
      this.incomeDataSource.sortingDataAccessor = (item: any, property) => {
        console.log(typeof property);
        switch (property) {
          case 'date': {
            let newDate = new Date(item.date);
            return newDate;
          }
          default: {
            return item[property];
          }
        }
      };
    } else {
      this.expenseDataSource.sortingDataAccessor = (item: any, property) => {
        console.log(typeof property);
        switch (property) {
          case 'date': {
            let newDate = new Date(item.date);
            return newDate;
          }
          default: {
            return item[property];
          }
        }
      };
    }
  }
}
