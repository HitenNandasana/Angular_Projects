import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {
  name: any;

  constructor(public designUtility: DesignUtilityService) {
    this.designUtility.username.subscribe(res => {
      this.name = res;
    })
  }

  ngOnInit(): void {
  }

}
