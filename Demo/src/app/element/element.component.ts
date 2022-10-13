import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  constructor(public popup: PopupService) { 
  }

  ngOnInit(): void {
  }
  
}
