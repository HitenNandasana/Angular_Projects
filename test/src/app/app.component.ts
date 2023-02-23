import { AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'test';
  color = '';

  @ViewChild('editor') editor: ElementRef | undefined;

  selectedColor: any = '#000000';

  constructor() { }

  ngOnInit(): void {
    console.log(this.editor);
    // Get the Trix editor instance
    const trixEditor = this.editor?.nativeElement.editor;

    // Add a listener for the color-picker button
    trixEditor?.toolbarElement.addEventListener('click', (event: any) => {
      console.log(event);
      if (event.target.matches('[data-action="color-picker"]')) {
        // Open the color picker dialog
        const dialog = document.querySelector('.color-picker-dialog');
        dialog?.classList.add('visible');
      }
    });

    // Add a listener for the color-picker dialog
    const colorPicker = document.querySelector('color-picker');
    colorPicker?.addEventListener('colorChange', (event: any) => {
      // Get the selected color and apply it to the current selection in the Trix editor
      const color = tinycolor(event.detail);
      const rgb = color.toRgbString();
      trixEditor.activateAttribute('style', { 'color': rgb });
    });
  }
}
