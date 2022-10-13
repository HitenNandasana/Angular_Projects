import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import emp from "../../employeeData.json";

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  productsArray: any;
  data: any
  constructor(private activeRoute: ActivatedRoute) {
    this.productsArray = emp;
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      let eid = Number(param['id']);
      this.data = this.productsArray.filter((item: { id: number; }) => item.id === eid);
      this.data = this.data[0];
    })

  }
  
}
