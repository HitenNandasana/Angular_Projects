import { Directive } from '@angular/core';

@Directive({
  selector: '[appTest]',
  standalone: true,
  host: { style: 'color:red' }
})
export class TestDirective {

  constructor() { }

}
