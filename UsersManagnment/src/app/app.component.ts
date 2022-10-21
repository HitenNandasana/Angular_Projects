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

  navList = [
    {
      routeLink: '/home',
      name: 'Home'
    },
    {
      routeLink: '/users',
      name: 'Users'
    }
    // {
    //   routeLink: '/logout',
    //   name: 'Logout'
    // }
  ]
  selected: any;
  loginName: string = '';
  constructor(private route: Router, private designUtility: DesignUtilityService) {

    this.designUtility.loggedIn.subscribe(res => {
      this.loginName = res;
    })
  }
  ngOnInit(): void {

    this.designUtility.autoLogin();
  }
  logInOut() {
    if (this.loginName === 'Login') {
      this.route.navigate(['/login']);
    } else {
      localStorage.removeItem('login');
      this.designUtility.loginUser.next('');
      this.loginName = 'Login';
      this.route.navigate(['/login']);

    }
  }
}
