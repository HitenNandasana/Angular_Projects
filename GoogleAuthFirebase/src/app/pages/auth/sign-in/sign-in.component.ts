import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormBuilder | any;
  submit = false;
  loginCheckMessage: boolean = false;

  constructor(private authservice: AuthService,
    private fb: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onkeydown() {
    this.loginCheckMessage = false;
  }

  signinWIthGoogle() {
    this.authservice.signInWithGoogle();
  }

  signIn() {
    this.submit = true;
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
    }

  }

  signUp(path: string) {
    this.route.navigate([path]);
  }
}
