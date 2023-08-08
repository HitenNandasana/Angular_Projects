import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  // constructor(private location: Location) { }


  ngOnInit() {
    let oldURL = document.referrer;
    alert(sessionStorage.getItem('previousPageUrl'));
  }
  previousUrl: string;

  constructor(private router: Router, private location: Location) {
    this.previousUrl = '';
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.previousUrl = this.location.path();
        console.log(this.previousUrl);
      });
  }

}
