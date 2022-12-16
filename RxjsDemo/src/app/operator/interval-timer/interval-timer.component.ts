import { Component, OnInit } from '@angular/core';
import { Subscription, count, interval, timer } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html',
  styleUrls: ['./interval-timer.component.scss']
})
export class IntervalTimerComponent implements OnInit {

  stop: Subscription | undefined;
  stop1: Subscription | undefined;
  cnt: any;

  constructor(private as: AppService) { }

  ngOnInit(): void {
    const count = interval(500);
    const countTIme = timer(2000, 500);

    this.stop = count.subscribe(res => {
      this.cnt = 'Count' + res;
      this.as.print(this.cnt, 'cnt')
      if (res > 5) {
        this.stop?.unsubscribe();
      }
    });

    this.stop1 = countTIme.subscribe(res => {
      this.cnt = 'Count' + res;
      this.as.print(this.cnt, 'cnt1')
      if (res > 5) {
        this.stop1?.unsubscribe();
      }
    });
  }

}
