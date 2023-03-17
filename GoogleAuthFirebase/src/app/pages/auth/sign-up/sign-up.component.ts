import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormBuilder | any;
  submit = false;
  emailCheckMessage = false;

  constructor(private fb: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onkeydown() {
    this.emailCheckMessage = false;
  }

  signUp() {
    this.submit = true;
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    }
  }

}
