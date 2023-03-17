import { Component, OnInit } from '@angular/core';
import { interval, map, Subscription, take } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private as: AppService) { }

  sub: Subscription | undefined;

  ngOnInit(): void {

    const count = interval(500);

    this.sub = count.pipe(
      take(11),
      map(data => data * 56)
    )
      .subscribe(res => {
        this.as.print(res, 'map');
      })
  }

}
