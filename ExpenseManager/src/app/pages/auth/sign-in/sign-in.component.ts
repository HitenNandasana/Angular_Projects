import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  signInForm: FormBuilder | any;
  submit = false;
  loggedIn!: boolean;
  loginCheckMessage = false;;

  constructor(private fb: FormBuilder,
    public authservice: AuthService,
  ) {
    this.authservice.loggedIn.subscribe(res => {
      this.loggedIn = res;
    })
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    })
  }
  onkeydown() {
    this.loginCheckMessage = false;
  }
  alert = {
    userNotFound: false,
    wrongPassword: false,
    unknownError: false,
  };
  signIn() {
    this.submit = true;
    if (this.signInForm.valid) {
      let obj = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      }
      this.authservice.signin(obj)
        //   () =>{

        //   },
        //   (res) => {
        //   if (res.error === - 1) {
        //     this.alert.unknownError = true;
        //   } else if (res.error === 'auth/email-not-found' || res.error === 'auth/user-not-found') {
        //     this.alert.userNotFound = true;
        //   } else if (res.error === 'auth/wrong-password') {
        //     this.alert.wrongPassword = true;
        //   }
        // })
        .catch(err => {
          this.loggedIn = false;
          this.loginCheckMessage = true
        });
    }
  }


}
