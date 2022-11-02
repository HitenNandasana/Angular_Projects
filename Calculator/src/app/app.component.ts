import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';
  digit = '';

  fun(number: any) {
    this.digit += number;
  }
  clear() {
    this.digit = ''
  }
  negative() {

  }
  modulo() {

  }
  equal() {
    this.digit = eval(this.digit);
  }
}
