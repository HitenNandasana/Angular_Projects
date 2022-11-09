import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      'name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'first_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'last_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'user_name': ['', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'profile_image': ['', [Validators.required]]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
    }
  }

  signUp() {
    this.submit = true;
    if (this.signUpForm.valid && this.fileHolder && this.fileHolder.name) {
      const formData = new FormData();

      formData.append('name', this.signUpForm.value.name);
      formData.append('first_name', this.signUpForm.value.first_name);
      formData.append('last_name', this.signUpForm.value.last_name);
      formData.append('user_name', this.signUpForm.value.user_name);
      formData.append('email', this.signUpForm.value.email);
      formData.append('password', this.signUpForm.value.password);
      formData.append('profile_image', this.fileHolder, this.fileHolder.name);

      this.authservice.signUp(formData).subscribe(res => {
        console.log(res);
      });
      this.route.navigate(['signin']);
      this.submit = false;
    }
  }

}
