import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UsersManagnment';

  navList = [
    {
      routeLink: '/home',
      name: 'Home'
    },
    {
      routeLink: '/users',
      name: 'Users'
    },
    {
      routeLink: '/logout',
      name: 'Logout'
    },
    {
      routeLink: '/login',
      name: 'Login'
    }
  ]
  selected: any;

  constructor(private route: Router) {

  }
}
