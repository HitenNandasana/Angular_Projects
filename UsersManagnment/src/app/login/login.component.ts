import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormBuilder | any;
  temp = false;
  loginCheckMessage = false;

  constructor(private fb: FormBuilder, private designUtility: DesignUtilityService, private route: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'uname': ['', Validators.required],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$")]],
    })
  }

  onkeydown() {
    this.loginCheckMessage = false;
  }

  login() {
    this.temp = true;
    if (this.loginForm.valid) {
      // console.log(this.loginForm);
      const check = this.designUtility.checkCredencial(this.loginForm);

      if (check) {
        this.route.navigate(['/home']);
      } else {
        this.loginCheckMessage = true;
      }
    }
  }
}
