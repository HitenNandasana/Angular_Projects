import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormBuilder | any;
  submit = false;
  loginCheckMessage = false;;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    })
  }
  onkeydown() {
    this.loginCheckMessage = false;
  }

  signIn() {
    this.submit = true;
    if (this.signInForm.valid) {
      const formData = new FormData();

      formData.append('email', this.signInForm.value.email);
      formData.append('password', this.signInForm.value.password);

      this.authservice.signIn(formData).subscribe(res => {
        this.authservice.setToken(res.data.token);
        console.log(res);
        this.toastr.success(res.msg);
        this.route.navigate(['/dashboard']);
      },
        error => {
          this.loginCheckMessage = true;
        });
      this.submit = false;
    }
  }

}
