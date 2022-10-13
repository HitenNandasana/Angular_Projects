import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebugService } from '../debug.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DebugService]
})
export class HeaderComponent implements OnInit {

  navList = [
    {
      routeLink: '/home',
      name: 'Home',
    },
    {
      routeLink: '/about',
      name: 'About'
    },
    {
      routeLink: '/ad',
      name: 'Ad'
    },
    {
      routeLink: '/parent',
      name: 'Parent'
    },
    {
      routeLink: '/element',
      name: 'Element'
    },
    {
      routeLink: '/binding',
      name: 'Binding'
    },
    {
      routeLink: '/pipe',
      name: 'Pipe'
    },
    {
      routeLink: '/svg',
      name: 'Svg'
    },
    {
      routeLink: '/directive',
      name: 'Directive'
    },
    {
      routeLink: '/image',
      name: 'Image'
    },
    {
      routeLink: '/debug',
      name: 'Debug'
    },
    {
      routeLink: '/route',
      name: 'Routing'
    },
    {
      routeLink: '/form',
      name: 'Form'
    },
    {
      routeLink: '/reactiveform',
      name: 'Reactive-Form'
    },
    {
      routeLink: '/posts',
      name: 'Posts-data'
    }
  ]
  selected: any;

  constructor(private debugService: DebugService, private route: Router) { }

  ngOnInit(): void {
    this.debugService.info("Header components initialized");
  }

  redirect(data: any, name: any) {
    this.route.navigateByUrl(data);
    this.selected = name;
  }

  isActive(data: any) {
    return this.selected === data;
  };

}
