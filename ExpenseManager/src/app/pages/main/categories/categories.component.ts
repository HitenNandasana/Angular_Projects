import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
// const htmlToPdfmake = require("html-to-pdfmake");
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  @ViewChild('pdfTable') pdfTable!: ElementRef;
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
    // let header = [['category', 'amount', 'type', 'date']]
    let head: any = [
      [
        { content: 'JUN 2023 - JUL 2023', colSpan: 4, styles: { halign: 'center', valign: 'middle', fontSize: 15, minCellHeight: 15 } },
      ],
      ['category', 'amount', 'type', 'date']
    ]
    let footer = [
      [{ content: 'Powered by Moon Technolabs', colSpan: 4, styles: { halign: 'center', valign: 'middle', minCellHeight: 15, fillColor: [250, 250, 250], textColor: 150 } }]
    ];
    let base64Img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII='

    const arr = this.categoryList.reduce((map, current) => {
      map.set(current.id, [current.category, current.amount, current.type, current.date]);
      return map;
    }, new Map());
    const result = [...arr.values()];

    let pdf = new jsPDF('p', 'mm', 'a4');
    let pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    let pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    const marginX = (pageWidth - 40) / 2;
    const marginY = (pageHeight - 10) / 2;
    // pdf.setFontSize(2P);
    pdf.text('', pageWidth / 2, 25, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    pdf.addImage(base64Img, 'JPEG', marginX, 2, 40, 15);


    // // Add the image data to the header
    // head.unshift([
    //   {
    //     image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=',
    //     colSpan: 4,
    //     styles: { halign: 'center' },
    //   },
    // ]);

    (pdf as any).autoTable({
      head: head,
      body: result,
      theme: 'grid',
      foot: footer,
      margin: { top: 20 },
      styles: {
        fillColor: 250,
        lineColor: 200,
        lineWidth: 0.2,
        cellPadding: 2,
        textColor: 100
      },
      // didDrawCell: (data: any) => {
      //   if (data.section === 'body' && data.column.index === 0) {
      //     var base64Img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpaqqqq3t7exsbGcnJy+vr6jo6PFxcUFpPI/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII='
      //     pdf.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10)
      //   }
      // },
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }

  // extra

  pdf() {
    var doc: any = new jsPDF();
    doc.autoTable({ html: '#pdfTable' })
    doc.save('table.pdf')

    // const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).download();
  }

  //extra


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
