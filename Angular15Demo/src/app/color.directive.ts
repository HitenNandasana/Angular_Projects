import { Directive } from '@angular/core';
import { PasswordValidateDirective } from './password-validate.directive';
import { TestDirective } from './test.directive';

@Directive({
  selector: '[appColor]',
  standalone: true,
  hostDirectives: [
    {
      directive: TestDirective,
      inputs: ['color'],
    },
    {
      directive: PasswordValidateDirective
    }
  ]
})
export class ColorDirective {

  constructor() { }

}
