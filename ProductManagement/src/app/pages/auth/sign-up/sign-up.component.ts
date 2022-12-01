import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormBuilder | any;
  submit = false;
  fileHolder: File | undefined;
  emailCheckMessage: boolean = false;

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'first_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'last_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'user_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z-0-9].*")]],
      'email': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9].*")]],
      'profile_image': ['', Validators.required]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      this.signUpForm.get('profile_image').setValue(this.fileHolder);
    }
  }
  onkeydown() {
    this.emailCheckMessage = false;
  }

  signUp() {
    this.submit = true;
    if (this.signUpForm.invalid) {
      return;
    }
    else {
      const formData = new FormData();

      formData.append('name', this.signUpForm.value.name);
      formData.append('first_name', this.signUpForm.value.first_name);
      formData.append('last_name', this.signUpForm.value.last_name);
      formData.append('user_name', this.signUpForm.value.user_name);
      formData.append('email', this.signUpForm.value.email);
      formData.append('password', this.signUpForm.value.password);
      formData.append('profile_image', this.signUpForm.value.profile_image);

      this.authservice.signUp(formData).subscribe(res => {
        console.log(res);
        this.route.navigate(['signin']);
        this.toastr.success(res.msg);
      },
        error => {
          this.emailCheckMessage = true;
        });
      this.submit = false;
    }
  }

}
