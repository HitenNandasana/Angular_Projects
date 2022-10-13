import { Component, Input } from '@angular/core';
import { AdvComponent } from '../ad/adv.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AdvComponent {
  title = 'Learning Angular';
  content = 'show';
  isValid = false;

  constructor() { }

  @Input() data: any


  months = [
    "January", "Feburary", "March", "April", "May", "June", "July", "August", "Sepember", "Octomber", "November", "December"
  ];

  changeMonth() {
    alert("Month Changed.");
  }
  clickFun() {
    alert("this is click.");
  }

  toggle(){
    this.isValid = !this.isValid;
    if (this.isValid) {
      this.content = 'hide';
    } else {
      this.content = 'show';
    }
  }
}
