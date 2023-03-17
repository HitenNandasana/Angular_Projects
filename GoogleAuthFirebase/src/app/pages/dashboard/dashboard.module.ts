import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard.component';
import { MatModule } from 'src/app/appModules/mat/mat.module';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatModule
  ]
})
export class DashboardModule { }
