import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import AppComponent from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { MapComponent } from './operator/map/map.component';
import { IntervalTimerComponent } from './operator/interval-timer/interval-timer.component';
import { OfFromComponent } from './operator/of-from/of-from.component';
import { ToArrayComponent } from './operator/to-array/to-array.component';
import { ListComponent } from './operator/list/list.component';
import { PluckComponent } from './operator/pluck/pluck.component';
import { FilterComponent } from './operator/filter/filter.component';
import { TapComponent } from './operator/tap/tap.component';
import { RetryComponent } from './operator/retry/retry.component';
import { DebouncetimeComponent } from './operator/debouncetime/debouncetime.component';
import { MergeMapComponent } from './operator/merge-map/merge-map.component';
import { ConcatMapComponent } from './operator/concat-map/concat-map.component';
import { SwitchMapComponent } from './operator/switch-map/switch-map.component';
import { ShareReplayComponent } from './operator/share-replay/share-replay.component';
import { CombineLatestComponent } from './operator/combine-latest/combine-latest.component';

@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    MapComponent,
    ToArrayComponent,
    OfFromComponent,
    IntervalTimerComponent,
    ListComponent,
    PluckComponent,
    FilterComponent,
    TapComponent,
    RetryComponent,
    DebouncetimeComponent,
    MergeMapComponent,
    ConcatMapComponent,
    SwitchMapComponent,
    ShareReplayComponent,
    CombineLatestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
