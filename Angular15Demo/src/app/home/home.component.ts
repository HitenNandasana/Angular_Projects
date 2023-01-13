import { Component } from '@angular/core';
import { TestDirective } from '../test.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    // provideImgixLoader('assets/image'),
  ],
  hostDirectives: [TestDirective]
})
export class HomeComponent {
  imageUrls: imageInfo[] = [];

  randomContent = "";

  constructor() {
    for (let i = 1; i < 7; i++) {
      this.imageUrls.push({
        id: "class-" + i,
        url: i + "-" + "4000x3000_ag.jpg"
      });
    }

    this.randomContent = "Lorem Ipsum is simply dummy te";
  }
}

export interface imageInfo {
  id: string;
  url: string;
}
