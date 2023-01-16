import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  languages = ['C++', 'Java', 'JavaScript', 'Python', 'TypeScript'];
  languageCtrl = new FormControl([]);

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
