import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';
  input = '';
  answer = false;

  fun(number: any) {
    if (this.input.length < 15) {
      if (this.answer) {
        if (this.input !== '') {
          this.input = '';
          this.answer = false;
        }
      }
      let lastChar = this.input.charAt(this.input.length - 1);
      let pos = this.getLastOperandPosition();
      if (number === '0') {
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
          this.input += number;
        }
        else if (this.input.charAt(pos + 1) !== '0') {
          this.input += number;
        }
        if (this.input === '') {
          this.input += number;
        }
      } else {
        if (this.input.charAt(pos + 1) !== '0') {
          this.input += number;
        }
        else {
          this.input = this.input.replace(/.$/, number);
        }
      }
    }
  }

  clear() {
    this.input = '';
    this.answer = false;
  }
  negative() {
    let lastChar = this.input.charAt(this.input.length - 1);
    let pos = this.getLastOperandPosition();
    console.log(pos);
    if (this.input !== '') {
      let i = this.input.charAt(pos + 1);
    } else {

    }
  }

  operatorFun(operator: any) {
    if (this.input !== '') {
      this.answer = false;
      let lastChar = this.input.charAt(this.input.length - 1);
      if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
        if (lastChar !== operator) {
          this.input = this.input.replace(/.$/, operator);
        }
      } else {
        this.input += operator;
      }
    }
  }

  equal() {
    if (this.answer) {
      return;
    } else {
      let lastChar = this.input.charAt(this.input.length - 1);
      if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
        this.input = this.input.replace(/.$/, '');
      }
      this.input = eval(this.input).toString();
      this.answer = true;
    }
  }

  getLastOperandPosition() {
    let pos: number;
    pos = this.input.lastIndexOf('+');
    if (this.input.lastIndexOf('-') > pos) pos = this.input.lastIndexOf('-');
    if (this.input.lastIndexOf('*') > pos) pos = this.input.lastIndexOf('*');
    if (this.input.lastIndexOf('/') > pos) pos = this.input.lastIndexOf('/');
    if (this.input.lastIndexOf('%') > pos) pos = this.input.lastIndexOf('%');
    return pos;
  }
}
