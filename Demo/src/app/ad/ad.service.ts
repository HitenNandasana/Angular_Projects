import { Injectable } from '@angular/core';

import { AdItem } from './aditem';
import { AdsComponent } from '../ads/ads.component';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  getAds() {
    return [
      new AdItem(
        AdsComponent,
        { headline: 'Hiring for several positions', body: 'Submit your resume today!' }
      ),
      new AdItem(
        AdsComponent,
        { headline: 'Openings in Angular', body: 'Apply today' }
      ),
      new AdItem(
        HomeComponent,
        { home : 'This is Home Component'}
      )
    ];
  }
}

