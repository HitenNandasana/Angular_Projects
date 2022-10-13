import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  color = '';

  // mouseClick(e:any){
  //   console.log(e.type)
  //   return e.color;
  // }
}
