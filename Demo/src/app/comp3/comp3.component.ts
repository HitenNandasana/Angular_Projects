import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {

  name: any;
  constructor(public designUtility: DesignUtilityService) {
    this.designUtility.username.subscribe(res => {
      this.name = res;
    })
  }

  ngOnInit(): void {
  }

}
