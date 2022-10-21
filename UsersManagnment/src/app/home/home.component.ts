import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginUserObj: any

  constructor(private designUtility: DesignUtilityService) {
    this.designUtility.loginUser.subscribe(res => {
      this.loginUserObj = res;
    })
  }

  ngOnInit(): void {
  }

}
