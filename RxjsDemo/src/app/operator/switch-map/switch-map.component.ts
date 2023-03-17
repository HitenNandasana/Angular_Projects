import { Component, OnInit } from '@angular/core';
import { from, of, delay, switchMap } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {

  constructor(private as: AppService) { }

  ngOnInit(): void {
    const data = from(['skill', 'hobby', 'languages']);

    data.pipe(
      switchMap(res => this.getDate(res)),
    )
      .subscribe(res => {
        this.as.print(res, 'switchmap');
      })
  }

  getDate(data: any) {
    return of(data + ' added').pipe(delay(1000));
  }
}
