import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PrimeNG';
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
        chips: new FormControl<string[] | null>(null)
    });
}
}
