import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
  name: any;

  constructor(public designUtility: DesignUtilityService) {
    this.designUtility.username.subscribe(res => {
      this.name = res;
    })
  }

  ngOnInit(): void {
  }

}
