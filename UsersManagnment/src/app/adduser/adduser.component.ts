import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  editMode: any;
  id: any;
  userdata: any;

  constructor(private route: Router, private designUtility: DesignUtilityService, private toastr: ToastrService, private activateRoute: ActivatedRoute) {
    this.designUtility.editMode.subscribe(res => {
      this.editMode = res;
    })
    this.designUtility.user.subscribe(res => {
      this.userdata = res;
    })
  }

  ngOnInit(): void {
  }

  save(addUserForm: NgForm) {
    if (addUserForm.valid === true) {
      let data = JSON.parse(localStorage.getItem('userList') || '');
      if (!this.editMode) {
        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((user: any) => user.id)) + 1;
        }
        let obj = {
          id: this.id,
          firstname: addUserForm.value.fname.replace(/\s+/g, ' ').trim(),
          lastname: addUserForm.value.lname.replace(/\s+/g, ' ').trim(),
          username: addUserForm.value.uname.replace(/\s+/g, ' ').trim(),
          password: addUserForm.value.password.replace(/\s+/g, ' ').trim()
        }
        data.push(obj);
        localStorage.setItem('userList', JSON.stringify(data));
        this.toastr.success('User added Successfully!');

      } else {
        const newArr = data.map((obj: any) => {
          if (obj.id === this.userdata.id) {
            console.log(this.userdata.id);
            return { ...obj, firstname: addUserForm.value.fname, lastname: addUserForm.value.lname, username: addUserForm.value.uname, password: addUserForm.value.password };
          }
          return obj;
        });
        localStorage.setItem('userList', JSON.stringify(newArr));
        this.toastr.success('User Updated Successfully!', 'Success!');
      }
      this.route.navigate(['/users']);
    }
  }
}
