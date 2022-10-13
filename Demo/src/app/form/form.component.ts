import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: any;

  constructor() { }

  submitted = false;

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    console.log(form);
    if (form.valid === true) {
      this.submitted = true;
    }
  }
  onReset(form:NgForm){
    form.reset();
    this.submitted = false;
  }
}
