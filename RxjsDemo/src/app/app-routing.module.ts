import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombineLatestComponent } from './operator/combine-latest/combine-latest.component';
import { ConcatMapComponent } from './operator/concat-map/concat-map.component';
import { DebouncetimeComponent } from './operator/debouncetime/debouncetime.component';
import { FilterComponent } from './operator/filter/filter.component';
import { IntervalTimerComponent } from './operator/interval-timer/interval-timer.component';
import { ListComponent } from './operator/list/list.component';
import { MapComponent } from './operator/map/map.component';
import { MergeMapComponent } from './operator/merge-map/merge-map.component';
import { OfFromComponent } from './operator/of-from/of-from.component';
import { OperatorComponent } from './operator/operator.component';
import { PluckComponent } from './operator/pluck/pluck.component';
import { RetryComponent } from './operator/retry/retry.component';
import { ShareReplayComponent } from './operator/share-replay/share-replay.component';
import { SwitchMapComponent } from './operator/switch-map/switch-map.component';
import { TapComponent } from './operator/tap/tap.component';
import { ToArrayComponent } from './operator/to-array/to-array.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'operator',
    pathMatch: 'full'
  },
  {
    path: 'operator',
    title: 'Operator',
    component: OperatorComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'offrom',
        component: OfFromComponent
      },
      {
        path: 'interval',
        component: IntervalTimerComponent
      },
      {
        path: 'toarray',
        component: ToArrayComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'pluck',
        component: PluckComponent
      },
      {
        path: 'filter',
        component: FilterComponent
      },
      {
        path: 'tap',
        component: TapComponent
      },
      {
        path: 'retry',
        component: RetryComponent
      },
      {
        path: 'dtime',
        component: DebouncetimeComponent
      },
      {
        path: 'mergeMap',
        component: MergeMapComponent
      },
      {
        path: 'concatMap',
        component: ConcatMapComponent
      },
      {
        path: 'switchMap',
        component: SwitchMapComponent
      },
      {
        path: 'sharereplay',
        component: ShareReplayComponent
      },
      {
        path: 'combinelatest',
        component: CombineLatestComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
