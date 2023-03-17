import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private route: Router) { }

  list = [
    {
      path: 'offrom',
      name: 'Off-From'
    },
    {
      path: 'interval',
      name: 'Interval'
    },
    {
      path: 'toarray',
      name: 'to-Array'
    },
    {
      path: 'map',
      name: 'Map'
    },
    {
      path: 'pluck',
      name: 'Pluck'
    },
    {
      path: 'filter',
      name: 'Filter'
    },
    {
      path: 'tap',
      name: 'Tap'
    },
    {
      path: 'retry',
      name: 'Retry'
    },
    {
      path: 'dtime',
      name: 'DebounceTime'
    },
    {
      path: 'mergeMap',
      name: 'MergeMap'
    },
    {
      path: 'concatMap',
      name: 'ConcatMap'
    },
    {
      path: 'switchMap',
      name: 'SwitchMap'
    },
    {
      path: 'sharereplay',
      name: 'ShareReplay'
    },
    {
      path: 'combinelatest',
      name: 'CombineLatest'
    },
  ]
  ngOnInit(): void {
  }

  redirect(path: any) {
    this.route.navigateByUrl(`operator/${path}`);
  }

}
