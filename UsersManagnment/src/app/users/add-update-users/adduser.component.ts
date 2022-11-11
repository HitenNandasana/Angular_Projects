import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignUtilityService } from '../../design-utility.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUserForm: FormBuilder | any;
  editMode: any;
  id: any;
  userdata: any;
  loginUserObj: any;
  temp = false;


  constructor(private route: Router, private designUtility: DesignUtilityService, private toastr: ToastrService, private activateRoute: ActivatedRoute, private fb: FormBuilder, private activeRoute: ActivatedRoute) {
    this.designUtility.editMode.subscribe(res => {
      this.editMode = res;
    })
    this.designUtility.user.subscribe(res => {
      this.userdata = res;
    })
    this.designUtility.loginUser.subscribe(res => {
      this.loginUserObj = res;
    })
  }

  ngOnInit(): void {
    if (/edit/.test(window.location.href)) {
      this.editMode = true;
      this.activateRoute.paramMap.subscribe(param => {
        let udata = this.designUtility.getSingleUserdata(this.loginUserObj.userList, param.get('id'));
        if (udata === undefined) {
          alert('User Not Found');
          this.route.navigate(['/users']);
        } else {
          this.userdata = udata;
        }
      })
    }
    this.addUserForm = this.fb.group({
      'fname': [this.editMode ? this.userdata.firstname : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'lname': [this.editMode ? this.userdata.lastname : '', [Validators.required, Validators.pattern("^[a-zA-Z].*")]],
      'uname': [this.editMode ? this.userdata.username : '', [Validators.required, Validators.pattern("^[a-zA-Z0-9].*")]],
      'password': [this.editMode ? this.userdata.password : '', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$")]]
    })

  }

  save() {
    this.temp = true;
    if (this.addUserForm.valid) {
      let data = this.designUtility.getRegisterData();
      const userArr = this.loginUserObj.userList;
      if (!this.editMode) {
        if (Object.keys(userArr).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...userArr.map((user: any) => user.id)) + 1;
        }
        let obj = {
          id: this.id,
          firstname: this.addUserForm.value.fname.replace(/\s+/g, ' ').trim(),
          lastname: this.addUserForm.value.lname.replace(/\s+/g, ' ').trim(),
          username: this.addUserForm.value.uname.replace(/\s+/g, ' ').trim(),
          password: this.addUserForm.value.password.replace(/\s+/g, ' ').trim()
        }
        userArr.push(obj);
        this.designUtility.user.next(this.loginUserObj);

        const newArr = data.map((obj: any) => {
          if (obj.id === this.loginUserObj.id) {
            return { ...obj, userList: userArr }
          }
          return obj;
        })

        this.designUtility.setRegisterData(newArr);
        this.designUtility.setLoginData(this.loginUserObj);
        this.toastr.success('User added Successfully!', 'Success!');
      } else {

        const newArr = userArr.map((obj: any) => {
          if (obj.id === this.userdata.id) {

            this.userdata.firstname = this.addUserForm.value.fname;
            this.userdata.lastname = this.addUserForm.value.lname;
            this.userdata.username = this.addUserForm.value.uname;
            this.userdata.password = this.addUserForm.value.password;

            return this.userdata;
          }
          return obj;
        });

        const arr = data.map((obj: any) => {
          if (obj.id === this.loginUserObj.id) {
            return { ...obj, userList: newArr }
          }
          return obj;
        })
        this.designUtility.setRegisterData(arr);
        this.designUtility.setLoginData(this.loginUserObj);
        this.toastr.success('User Updated Successfully!', 'Success!');
      }
      this.route.navigate(['/users']);
    }
  }

}
