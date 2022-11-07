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
  infinity = false;

  fun(number: any) {
    let pos = this.getLastOperandPosition();
    let str = this.input.substring(pos)
    if (str.length < 15) {
      if (this.answer && this.infinity) {
        if (this.input !== '') {
          this.input = '';
          this.infinity = false;
          this.answer = false;
        }
      }
      let lastChar = this.input.charAt(this.input.length - 1);
      if (number === '0') {
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
          this.input += number;
        }
        else if (this.input.charAt(pos + 1) !== '0') {
          this.input += number;
        }
        else if (this.input.charAt(pos + 2) === '.') {
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
          if (this.input.charAt(pos + 2) === '.') {
            this.input += number;
          } else {
            this.input = this.input.replace(/.$/, number);
          }
        }
      }
    }
  }

  dot(number: any) {
    let pos = this.getLastOperandPosition();
    let string = this.input.substring(pos);
    if (this.input.length - pos === 1) {
      this.input = this.input + '0' + number;
    } else {
      if (string.includes(number)) {
        return;
      } else {
        this.input += number;
      }
    }
  }

  modulo() {
    if (this.input === '') {
      return;
    } else {

      let lastChar = this.input.charAt(this.input.length - 1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        return;
      } else {
        this.input = eval(this.input).toString();
        this.input = this.input + '/100';
        this.input = eval(this.input).toString();
      }
    }
  }

  clear() {
    this.input = '';
    this.answer = false;
    this.infinity = false;
  }

  negative() {
    let pos = this.getLastOperandPosition();
    if (this.input !== '') {
      if (this.input.length - pos === 1) {
        return;
      } else {
        let i = this.input.charAt(pos);
        let symbol = i === '+' ? '-' : '+';
        if (i === '+' || i === '-') {
          this.input = this.input.substring(0, pos) + symbol + this.input.substring(pos + 1);
        } else {
          this.input = this.input.substring(0, pos) + i + '(' + symbol + this.input.substring(pos + 1) + ')';
        }
      }
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
    if (this.infinity) {
      this.input = '';
    }
    this.infinity = false;
    if (this.answer) {
      return;
    } else {
      let lastChar = this.input.charAt(this.input.length - 1);
      if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
        this.input = this.input.replace(/.$/, '');
      }
      this.input = eval(this.input).toString();
      this.input = this.input === 'Infinity' || this.input === '-Infinity' ? 'Cannot divide by zero' : this.input;
      this.input = this.input === 'NaN' ? 'Result is undefined' : this.input;
      if (this.input === 'Cannot divide by zero' || this.input === 'Result is undefined') {
        this.infinity = true;
      } else {
        this.infinity = false;
      }
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
