import { Component, OnInit } from '@angular/core';
import { from, map, mergeAll, mergeMap, of } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {

  constructor(private as: AppService) { }


  ngOnInit(): void {
    const data = from(['skill', 'hobby', 'languages']);

    data.pipe(
      mergeMap(res => this.getDate(res)),
    )
      .subscribe(res => {
        this.as.print(res, 'mergemap');
      })
  }

  getDate(data: any) {
    return of(data + ' added');
  }

}
