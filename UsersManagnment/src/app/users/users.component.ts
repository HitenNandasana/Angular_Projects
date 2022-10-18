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

  constructor(private route: Router, private designUtility: DesignUtilityService, private toastr: ToastrService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    if (localStorage.getItem('userList') === null || localStorage.getItem('userList') == undefined) {
      let userList: any = [];

      localStorage.setItem('userList', JSON.stringify(userList));
      return;
    } else {
      this.userdata = JSON.parse(localStorage.getItem('userList') || '');
      return this.userdata;
    }
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

  deleteUser(id: any) {
    let data = JSON.parse(localStorage.getItem('userList') || '');
    if (confirm('Do you really want to delete this?')) {
      data.splice(id, 1);
      localStorage.setItem('userList', JSON.stringify(data));
      this.toastr.success('User Deleted Successfully!')
      this.getData();
    }
  }
}
