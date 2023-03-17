import { Component, OnInit } from '@angular/core';
import { from, map, Subscription, take, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {

  constructor(private as: AppService) { }

  data = from([
    { id: 1, name: 'abc' },
    { id: 2, name: 'gffg' },
    { id: 3, name: 'fg' },
    { id: 4, name: 'fgsdrf' },
    { id: 5, name: 'afdfd' },
    { id: 6, name: 'abgfdsgc' },
    { id: 7, name: 'dffgfbc' },
  ])

  ngOnInit(): void {
    this.data.pipe(
      tap(res => {
        console.log(res);
      }),
      map(x => x.name)
    )
      .subscribe(res => {
        this.as.print(res, 'tap')
      })
  }

}
