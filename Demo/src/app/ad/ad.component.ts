import { Component, OnInit } from '@angular/core';
import { AdService } from './ad.service';
import { AdItem } from './aditem';


@Component({
  selector: 'app-ad',
  templateUrl: 'ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  ads: AdItem[] = [];

  constructor(public adService: AdService) { }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
