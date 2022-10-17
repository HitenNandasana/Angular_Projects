import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DesignUtilityService } from '../design-utility.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  editMode: any;
  id: any;

  constructor(private route: Router, private designUtility: DesignUtilityService) {
    this.designUtility.editMode.subscribe(res => {
      this.editMode = res;
    })
    this.designUtility.id.subscribe(res => {
      this.id = res;
    })
  }

  ngOnInit(): void {
  }

  save(addUserForm: NgForm) {
    let data = JSON.parse(localStorage.getItem('userList') || '');
    data.push(addUserForm);
    localStorage.setItem('userList', JSON.stringify(data));
    this.designUtility.id.next(this.id + 1);

    this.route.navigate(['/users']);
  }
}
