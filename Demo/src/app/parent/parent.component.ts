import {  Component, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{

  @ViewChild(ChildComponent) child: any;
  
  constructor() { }

  message:any;
  name = 'Hiten';
  pdata = '';
  addCount:any = 0;
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    setTimeout(() => {
      this.message = this.child.msg;
    }, 0);
  }

}
