import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  myForm: any;

  constructor() { }

  submitted = false;

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid === true) {
      this.submitted = true;
    }
  }
  onReset(form: NgForm) {
    form.reset();
    this.submitted = false;
  }
}
