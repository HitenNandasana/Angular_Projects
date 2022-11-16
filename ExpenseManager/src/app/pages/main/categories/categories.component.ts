import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'


export interface UserData {
  id: string;
  name: string;
  price: string;
  date: string | null;
}

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Hiten',
  'Sager',
  'Ravi'
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'date', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: Router,
    public datepipe: DatePipe) {
    // Create 10 users
    const users = Array.from({ length: 10 }, (_, k) => this.createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  /** Builds and returns a new User. */
  createNewUser(this: any, id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))];

    let date = new Date();
    let today = this.datepipe.transform(date, 'dd-MM-yyyy')

    return {
      id: id.toString(),
      name: name,
      price: Math.round(Math.random() * 100).toString(),
      date: today,
    };
  }
}
