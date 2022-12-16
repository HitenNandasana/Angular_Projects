import { Component, OnInit } from '@angular/core';
import { filter, from, toArray } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor() { }

  data = from([
    { id: 1, name: 'abc', job: { title: 'fsafas', desc: '132es' } },
    { id: 2, name: 'gffg', job: { title: 'fgfbv', desc: 'cgvbwer5' } },
    { id: 3, name: 'fg', job: { title: 'fw', desc: 't43534' } },
    { id: 4, name: 'fgfsdgsdrf', job: { title: 'wqeqw2', desc: 'df4' } },
    { id: 5, name: 'afgfdfd', job: { title: 'b vd', desc: 'grt34' } },
    { id: 6, name: 'abgfdsdfgc', job: { title: 'gfhgbd', desc: 'f34dv' } },
    { id: 7, name: 'dfsdfafgfbc', job: { title: 'mhgk', desc: 'nm9o7' } },
  ])

  list: any;
  ngOnInit(): void {

    this.data.pipe(
      filter(data => data.name.length > 5),
      toArray()
    )
      .subscribe(res => {
        this.list = res;
      })
  }

}
