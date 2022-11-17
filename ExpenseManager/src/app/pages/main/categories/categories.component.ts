import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { CategoryData } from 'src/app/models/data';
import { CategoryService } from 'src/app/appServices/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  public categoryList!: CategoryData[];
  displayedColumns: string[] = ['category', 'amount', 'type', 'date', 'actions'];
  dataSource!: MatTableDataSource<CategoryData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: Router,
    public datepipe: DatePipe,
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

  addCategory() {
    this.route.navigate(['main/category/add']);
  }

  editCategory() {
  }

  deleteCategory() {
  }

  async getList() {
    let category: CategoryData[];
    await this.categoryservice.getCategoryData().then(value => {
      category = value as CategoryData[];
      this.categoryList = category;
    })
    this.categoryservice.id.next(this.categoryList.length);
    this.dataSource = new MatTableDataSource(this.categoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
