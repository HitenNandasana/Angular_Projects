import { Component } from '@angular/core';
import { ColorDirective } from '../color.directive';
import { TestDirective } from '../test.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    ColorDirective
  ],
  hostDirectives: [
    ColorDirective
  ]
})
export class HomeComponent {
}
