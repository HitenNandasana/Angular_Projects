import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormBuilder | any;
  temp = false;
  id: any;
  arr: any = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private route: Router) {
    if (localStorage.getItem('register') === null || localStorage.getItem('register') == undefined) {
      let userList: any = [];

      localStorage.setItem('register', JSON.stringify(userList));
      return;
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'uname': ['', Validators.required],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$")]]
    })
  }

  register() {
    this.temp = true;
    if (this.registerForm.valid === true) {
      let data = JSON.parse(localStorage.getItem('register') || '');

      if (Object.keys(data).length === 0) {
        this.id = 1;
      } else {
        this.id = Math.max(...data.map((user: any) => user.id)) + 1;
      }
      let obj = {
        id: this.id,
        firstname: this.registerForm.value.fname.replace(/\s+/g, ' ').trim(),
        lastname: this.registerForm.value.lname.replace(/\s+/g, ' ').trim(),
        username: this.registerForm.value.uname.replace(/\s+/g, ' ').trim(),
        password: this.registerForm.value.password.replace(/\s+/g, ' ').trim(),
        userList: this.arr
      }
      data.push(obj);
      localStorage.setItem('register', JSON.stringify(data));
      this.toastr.success('Register Successfully!');

      this.route.navigate(['/login']);
    }
  }
}
