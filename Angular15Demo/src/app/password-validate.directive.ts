import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidate]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidateDirective, multi: true }]
})

export class PasswordValidateDirective implements Validator {

  constructor() { }

  regex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const val = this.regex.test(control.value);
    return val ? null : { passwordValidate: true }
  }
}

