import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.component.html',
  styleUrls: ['./localstorage.component.css']
})
export class LocalstorageComponent implements OnInit {

  data: any = {
  }
  temp: any = {
  }
  temp1: any = {
  }
  submit = false;

  constructor() { }

  ngOnInit(): void {
  }
  save(form: NgForm) {
    this.data.name = form.value.name;
    this.data.age = form.value.age;
    localStorage.setItem(this.data.name, JSON.stringify(this.data));
    this.submit = false;
    form.reset();
  }

  get(form: NgForm) {
    this.temp = localStorage.getItem(form.value.name);
    this.temp1 = JSON.parse(this.temp);
    this.submit = true;
  }
}
