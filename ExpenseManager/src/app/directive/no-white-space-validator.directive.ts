import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNoWhiteSpaceValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhiteSpaceValidatorDirective, multi: true }]

})
export class NoWhiteSpaceValidatorDirective {

  constructor() { }

  validate(form: FormControl): ValidationErrors | null {
    return form.value.trim().length === 0 ? { whitespace: true } : null;
  }
}
