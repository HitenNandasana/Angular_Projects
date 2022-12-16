import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, delay, retry, retryWhen, scan, toArray } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss']
})
export class RetryComponent implements OnInit {
  error: any;

  constructor(private http: HttpClient,
    private as: AppService) { }

  data: any;

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      retry(5),
      catchError(this.as.handleError)
      // retryWhen(err => err.pipe(
      //   delay(3000),
      //   scan(cnt => {
      //     if (cnt >= 5) {
      //       throw err
      //     } else {
      //       cnt = cnt + 1;
      //       return cnt;
      //     }
      //   })
      // ))
    )
      .subscribe(res => {
        this.data = res;
      },
        err => {
          this.error = err;
        }
      )
  }

}
