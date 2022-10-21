import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  name: any

  constructor(private designUtility: DesignUtilityService) {
    this.designUtility.username.subscribe(res => {
      this.name = res;
    })
  }

  ngOnInit(): void {
  }

}
