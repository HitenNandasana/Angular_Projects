import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/appServices/category/category.service';
import { CategoryData } from 'src/app/models/data';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {

  public incomeList!: CategoryData[];
  displayedColumns: string[] = ['category', 'amount', 'date', 'actions'];
  dataSource!: MatTableDataSource<CategoryData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: Router,
    private categoryservice: CategoryService
  ) {
    this.getList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editIncome(data: any) {
    // this.categoryservice.editCategoryObj.next(data);
    // this.route.navigate(['main/category/edit', data.id]);
  }

  deleteIncome(data: any) {
    // if (confirm('Do you really want to Delete this?')) {
    //   this.categoryservice.delete(data);
    //   this.getList();
    // }
  }

  async getList() {
    // let category: CategoryData[];
    // await this.categoryservice.getCategoryData().then(value => {
    //   category = value as CategoryData[];
    //   this.categoryList = category;
    //   this.categoryservice.id.next(this.categoryList[this.categoryList.length - 1].id);
    // }).catch(error => {
    //   // console.log(error);
    // })
    // this.dataSource = new MatTableDataSource(this.categoryList);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
} 
