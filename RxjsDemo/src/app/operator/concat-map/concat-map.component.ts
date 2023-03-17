import { Component, OnInit } from '@angular/core';
import { concatMap, delay, from, of } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {

  constructor(private as: AppService) { }

  ngOnInit(): void {
    const data = from(['skill', 'hobby', 'languages']);

    data.pipe(
      concatMap(res => this.getDate(res)),
    )
      .subscribe(res => {
        this.as.print(res, 'concatmap');
      })
  }

  getDate(data: any) {
    return of(data + ' added').pipe(delay(1000));
  }

}
