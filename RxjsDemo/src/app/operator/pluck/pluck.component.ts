import { Component, OnInit } from '@angular/core';
import { from, interval, pluck, Subscription, take } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.scss']
})
export class PluckComponent implements OnInit {

  constructor(private as: AppService) { }

  data = from([
    { id: 1, name: 'abc', job: { title: 'fsafas', desc: '132es' } },
    { id: 2, name: 'gffg', job: { title: 'fgfbv', desc: 'cgvbwer5' } },
    { id: 3, name: 'fg', job: { title: 'fw', desc: 't43534' } },
    { id: 4, name: 'fgfsdgsdrf', job: { title: 'wqeqw2', desc: 'df4' } },
    { id: 5, name: 'afgfdfd', job: { title: 'b vd', desc: 'grt34' } },
    { id: 6, name: 'abgfdsdfgc', job: { title: 'gfhgbd', desc: 'f34dv' } },
    { id: 7, name: 'dfsdfafgfbc', job: { title: 'mhgk', desc: 'nm9o7' } },
  ])

  ngOnInit(): void {
    // const count = interval(500);

    this.data.pipe(
      take(7),
      pluck('name')
    )
      .subscribe(res => {
        this.as.print(res, 'pluck')
      })
  }

}
