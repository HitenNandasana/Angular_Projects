import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private route: Router, private designUtility: DesignUtilityService) {
    this.getData();
    // this.designUtility.editMode.subscribe(res => {
    //   this.editMode = res;
    // })
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

  editUser(id: any) {
    this.designUtility.editMode.next(true);
    this.route.navigate(['users/edit'], { queryParams: { id } });
  }

  deleteUser(id: any) {
    let data = JSON.parse(localStorage.getItem('userList') || '');
    data.splice(id, 1);
    localStorage.setItem('userList', JSON.stringify(data));
    this.getData();
  }
}
