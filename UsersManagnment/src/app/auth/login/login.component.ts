import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignUtilityService } from '../../design-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormBuilder | any;
  temp = false;
  loginCheckMessage = false;
  loginUserObj: any

  constructor(private fb: FormBuilder, private designUtility: DesignUtilityService, private route: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'uname': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'password': ['', [Validators.required]],
    })
  }

  onkeydown() {
    this.loginCheckMessage = false;
  }

  login() {
    this.temp = true;
    if (this.loginForm.valid) {
      const check = this.designUtility.checkCredencial(this.loginForm);

      if (check) {
        let data = this.designUtility.getLoginData();
        this.designUtility.loginUser.subscribe(res => {
          this.loginUserObj = res;
        })
        // data.push(this.loginUserObj);
        this.designUtility.setLoginData(this.loginUserObj);

        this.toastr.success('Login Successfully!');
        this.route.navigate(['/home']);
      } else {
        this.loginCheckMessage = true;
      }
    }
  }
}
