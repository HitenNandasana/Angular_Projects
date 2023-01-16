import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ColorDirective } from '../color.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ColorDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  hostDirectives: [
    {
      directive: ColorDirective,
    }
  ]
})
export class FormComponent {
  myForm: any;

  constructor() { }

  submitted = false;

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form);
      this.submitted = true;
    }
  }
  onReset(form: NgForm) {
    form.reset();
    this.submitted = false;
  }
}
