import { Component, OnInit } from '@angular/core';
import { from, interval, of, Subscription, take, timer, toArray } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export default class AppComponent implements OnInit {
  title = 'RxjsDemo';
  ngOnInit() {
  }
}
