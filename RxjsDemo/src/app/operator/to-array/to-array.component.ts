import { Component, OnInit } from '@angular/core';
import { Subscription, interval, take, toArray } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit {

  constructor(private as: AppService) { }

  stop2: Subscription | undefined;

  ngOnInit(): void {

    const countfortoArray = interval(500);

    this.stop2 = countfortoArray.pipe(
      take(5),
      toArray()
    )
      .subscribe(res => {
        console.log(res);
        this.as.print(res, 'toarray')
      })
  }

}
