import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from './popup.component';

@Injectable()
export class PopupService {

  constructor() { }
  showAsElement(message: string) {
    // Create element
    const popupEl: NgElement & WithProperties<PopupComponent> =
      document.createElement('pop-element') as any;


    // Set the message
    popupEl.message = message;
    
    // Add to the DOM
    document.body.appendChild(popupEl);
  }
}
