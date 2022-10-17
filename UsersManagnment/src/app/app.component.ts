import { Component } from '@angular/core';
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
    }
  ]
  selected: any;

  constructor(private route: Router) {

  }

  redirect(data: any, name: any) {
    this.route.navigateByUrl(data);
    this.selected = name;
  }
  isActive(data: any) {
    return this.selected === data;
  };
}
