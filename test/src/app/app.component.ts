import { ViewEncapsulation } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
// import { HtmlEditorService, ImageService, LinkService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import * as tinycolor from 'tinycolor2';
import Trix from "trix";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  // providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AppComponent {
  title = 'test';
  color = '';

  @ViewChild('editor') editor: ElementRef | undefined;

  public customtoolbar: Object = {
    items: ['Bold', 'FontColor', 'BackgroundColor']
  };
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };

  selectedColor: any = '#000000';

  constructor() { }

  ngOnInit(): void {
    // console.log(this.editor);
    // // Get the Trix editor instance
    // const trixEditor = this.editor?.nativeElement.editor;

    // // Add a listener for the color-picker button
    // trixEditor?.toolbarElement.addEventListener('click', (event: any) => {
    //   console.log(event);
    //   if (event.target.matches('[data-action="color-picker"]')) {
    //     // Open the color picker dialog
    //     const dialog = document.querySelector('.color-picker-dialog');
    //     dialog?.classList.add('visible');
    //   }
    // });

    // // Add a listener for the color-picker dialog
    // const colorPicker = document.querySelector('color-picker');
    // colorPicker?.addEventListener('colorChange', (event: any) => {
    //   // Get the selected color and apply it to the current selection in the Trix editor
    //   const color = tinycolor(event.detail);
    //   const rgb = color.toRgbString();
    //   trixEditor.activateAttribute('style', { 'color': rgb });
    // });


    // addEventListener("trix-initialize", function (event: any) {
    //   // debugger
    //   let buttonHTML, buttonGroup

    //   buttonHTML = '<button type="button" data-trix-attribute="sup"><sup>SUP</sup></button>'
    //   buttonHTML += '<button type="button" data-trix-attribute="sub"><sub>SUB</sub></button>'

    //   buttonGroup = event.target.toolbarElement.querySelector(".button_group.text_tools")
    //   buttonGroup.insertAdjacentHTML("beforeend", buttonHTML)
    // })
    addEventListener("trix-initialize", function (event: any) {
      console.log(event.target.toolbarElement.querySelector(".button_group.text_tools"));
      Trix.config.textAttributes.underline = {
        style: { "textDecoration": "underline" },
        inheritable: true,
        parser: function (element) {
          var style = window.getComputedStyle(element);
          return style.textDecoration === "underline";
        }
      }

      var buttonHTML = '<button type="button" class="underline" data-trix-attribute="underline" title="underline">U</button>'
      // debugger
      console.log(Trix.config.toolbar.content);
      // var groupElement = Trix.config.toolbar.content.querySelector(".text_tools")
      var groupElement = event.target.toolbarElement.querySelector(".button_group.text_tools")
      groupElement.insertAdjacentHTML("beforeend", buttonHTML);
    })
  }

  trixChange(e: any, editor: any) {
    console.log(e);
    console.log(editor);
  }
}

