import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignUtilityService } from './design-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UsersManagnment';
  checkLoggedIn = new Boolean;

  navList = [
    {
      routeLink: '/home',
      name: 'Home'
    },
    {
      routeLink: '/users',
      name: 'Users'
    }
  ]
  selected: any;
  loginName: string = '';
  constructor(private route: Router, private designUtility: DesignUtilityService) {

    this.designUtility.loggedIn.subscribe(res => {
      this.checkLoggedIn = res;
    })
  }
  ngOnInit(): void {

    this.designUtility.autoLogin();
  }
  logInOut() {
    if (this.checkLoggedIn) {
      this.loginName = 'Logout';
    } else {
      this.loginName = 'Login';
    }
  }
}
