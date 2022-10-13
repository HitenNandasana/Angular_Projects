import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {

  myReactiveForm: FormGroup | any;
  value: any;
  submitted = false;
  temp = false;
  count = 1;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myReactiveForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")]],
      'cpassword': ['', Validators.required],
      'phone': ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      'city': ['', Validators.required],
      'languages': this.fb.array([
        ['', Validators.required]
      ])  
    }, { validators: this.passwordMatchValidator });
  }
  onSubmit() {
    this.temp = true;
    console.log(this.myReactiveForm);
    if (this.myReactiveForm.valid === true) {
      this.submitted = true;
    }
  }
  onReset() {
    this.myReactiveForm.reset();
    this.submitted = false;
    this.temp = false
  }
  addLanguage() {
    const control = new FormControl(null, Validators.required);
    this.myReactiveForm.get('languages').push(control);
    this.count++;
  }
  removeLanguage(index: any) {
    if (index >= 0 && this.count > 1) {
      this.myReactiveForm.get('languages').removeAt(index);
      this.count--;
    }
  }
  passwordMatchValidator(control: AbstractControl) {
    const pass = control.get('password');
    const cpass = control.get('cpassword');

    return pass && cpass && pass.value !== cpass.value ? { passwordMatch: true } : null;
  }
  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;
    }
    return true;
  }
}
