import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, retry, shareReplay, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss']
})
export class ShareReplayComponent implements OnInit {
  obs: Observable<any> | undefined
  firstFiveUser: Observable<any> | undefined
  lastFiveUser: Observable<any> | undefined
  constructor(private http: HttpClient,
    private as: AppService) { }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.obs = this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      shareReplay()
    )

    this.firstFiveUser = this.obs.pipe(
      map(res =>
        res.filter((data: any) => {
          return data.userId <= 5
        })
      )
    )
    this.lastFiveUser = this.obs.pipe(
      map(res =>
        res.filter((data: any) => {
          return data.userId > 5
        })
      )
    )
  }
}
