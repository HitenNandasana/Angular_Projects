import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emp from "../employeeData.json";

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {

  empdata: any;
  constructor(private route: Router) {
    this.empdata = emp;
  }

  ngOnInit(): void {

  }

  goToEmpDetails(id: any) {
    this.route.navigate(['route/emp-detail'], { queryParams: { id } })
  }

}
