import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userdata: any = [];
  editMode: any;
  loginUserObjArr: any = [];
  loginUserObj: any = [];

  constructor(private route: Router, private designUtility: DesignUtilityService, private toastr: ToastrService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    this.designUtility.loginUser.subscribe(res => {
      this.loginUserObj = res;
    })
    this.loginUserObjArr = this.loginUserObj.userList;
  }

  addUser() {
    this.designUtility.editMode.next(false);
    this.route.navigate(['users/add']);
  }

  editUser(user: any) {
    this.designUtility.editMode.next(true);
    this.designUtility.user.next(user);
    this.route.navigate(['users/edit', user.id]);
  }

  deleteUser(index: any) {
    let data = this.designUtility.getRegisterData()
    if (confirm('Do you really want to delete this?')) {
      this.loginUserObjArr.splice(index, 1);
      this.designUtility.loginUser.next(this.loginUserObj);

      const arr = data.map((obj: any) => {
        if (obj.id === this.loginUserObj.id) {
          return { ...obj, userList: this.loginUserObjArr }
        }
        return obj;
      })
      this.designUtility.setRegisterData(arr);
      this.designUtility.setLoginData(this.loginUserObj);
      this.toastr.success('User Deleted Successfully!')
      this.getData();
    }
  }
}
