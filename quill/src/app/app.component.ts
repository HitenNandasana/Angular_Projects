import { AfterViewInit, Component } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'quill';

  // ngAfterViewInit() {
  //   var toolbarOptions = [
  //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //     ['blockquote', 'code-block'],

  //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  //     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  //     [{ 'direction': 'rtl' }],                         // text direction

  //     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //     [{ 'font': [] }],
  //     [{ 'align': [] }],

  //     ['clean']                                         // remove formatting button
  //   ];

  //   var editor = new Quill('#editor', {
  //     modules: { toolbar: toolbarOptions },
  //     theme: 'snow'
  //   });
  // }


  //new code ngx-quill

  htmlText = "<p>Testing</p>"
  hasFocus = false;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        //['link', 'image', 'video']  
      ],

    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm :any, renderList:any, mentionChar:any) => {
        let values;

        if (mentionChar === "@") {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range:any, context:any) => {
            console.log("enter");
            return true;
          }
        }
      }
    }
  }

  constructor(

  ) {

  }

  test = (event: any) => {
    console.log(event.keyCode);
  }

  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: any) => {
    //console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }


}
