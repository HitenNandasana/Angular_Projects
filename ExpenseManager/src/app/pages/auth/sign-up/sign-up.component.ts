import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  signUpForm: FormBuilder | any;
  submit = false;
  emailCheckMessage: boolean = false;

  constructor(private fb: FormBuilder,
    private authservice: AuthService) {
    this.authservice.getList();
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required]],
    })
  }

  onkeydown() {
    this.emailCheckMessage = false;
  }

  signUp() {
    this.submit = true;
    if (this.signUpForm.valid) {
      let obj = {
        firstName: this.signUpForm.value.first_name.trim(),
        lastName: this.signUpForm.value.last_name.trim(),
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password.trim(),
      }

      this.authservice.signup(obj)
        .catch(err => {
          this.emailCheckMessage = true;
        });
    }
  }

}
