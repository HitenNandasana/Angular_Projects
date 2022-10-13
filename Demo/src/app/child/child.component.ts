import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  message: string | undefined;

  constructor() { }

  @Input() public pname: any;
  @Output() public childData = new EventEmitter();

  @Input() public count: any;
  @Output() public countChange = new EventEmitter();

  // addCnt() {
  //   this.addct(+1);
  // }

  addCnt(val: Number) {
    this.count = this.count + val;
    this.countChange.emit(this.count);
  }

  reset() {
    this.count = 0;
    this.countChange.emit(this.count)
  }

  msg = "VIewChild data in parent component";
  ngOnInit(): void {
  }

  func() {
    this.childData.emit('Child data in parent component.')
  }

}
