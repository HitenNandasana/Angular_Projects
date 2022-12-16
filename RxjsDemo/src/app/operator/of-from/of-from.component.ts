import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {

  constructor(private as: AppService) { }

  ngOnInit(): void {

    const obs = of('one', 'two', 'three', 'four');
    const obs1 = from(['one', 'two', 'three', 'four']);

    obs.subscribe(res => {
      this.as.print(res, 'of')
    });

    obs1.subscribe(res => {
      this.as.print(res, 'from')
    });
  }

}
