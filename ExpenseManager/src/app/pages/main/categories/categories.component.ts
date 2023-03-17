import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { CategoryData } from 'src/app/models/data';
import { CategoryService } from 'src/app/appServices/category/category.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  temp = false;
  public categoryList!: CategoryData[];
  displayedColumns: string[] = ['category', 'amount', 'type', 'date', 'actions'];
  dataSource!: MatTableDataSource<CategoryData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: Router,
    public datepipe: DatePipe,
    private categoryservice: CategoryService
  ) {
    this.getList();
  }

  exportCsv() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Your Data',
      useBom: true,
      headers: ['category', 'amount', 'type', 'date', 'actions']
    };
    new ngxCsv(this.categoryList, 'My data', options);
  }

  exportPdf() {
    let header = [['category', 'amount', 'type', 'date']]

    const arr = this.categoryList.reduce((map, current) => {
      map.set(current.id, [current.category, current.amount, current.type, current.date]);
      return map;
    }, new Map());
    const result = [...arr.values()];

    let pdf = new jsPDF('p', 'mm', 'a4');
    // pdf.setFontSize(2P);
    pdf.text('Angular PDF Table', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    (pdf as any).autoTable({
      head: header,
      body: result,
      theme: 'striped',
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
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

  editCategory(data: any) {
    this.categoryservice.editCategoryObj.next(data);
    this.route.navigate(['main/category/edit', data.id]);
  }

  deleteCategory(data: any) {
    if (confirm('Do you really want to Delete this?')) {
      this.categoryservice.delete(data);
      this.getList();
    }
  }

  async getList() {
    let category: CategoryData[];
    await this.categoryservice.getCategoryData().then(value => {
      category = value as CategoryData[];
      this.categoryList = category;
      this.categoryservice.id.next(this.categoryList[this.categoryList.length - 1].id);
    }).catch(error => {
      // console.log(error);
      this.temp = true
    })
    this.dataSource = new MatTableDataSource(this.categoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortDate() {
    this.dataSource.sortingDataAccessor = (item: any, property) => {
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
