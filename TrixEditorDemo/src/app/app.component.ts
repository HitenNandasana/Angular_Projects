import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrixEditorDemo';
  public text: any;

  list = ['hiten', 'sagar', 'jay', 'ravi', 'abc', 'xyz']
  // editor!: Editor;
  htmlText = '';

  itemSelected(event: any) {
    setTimeout(() => {
      this.text = document.getElementById('trix_input');
      this.text.innerHTML = this.text.innerHTML.replace(
        event.label,
        '<b>' + event.label + '</b>&nbsp;'
      );
      // put the cursor to the end of field again...
      this.selectEnd();
    }, 10);
  }
  selectEnd() {
    let range, selection;
    range = document.createRange();
    range.selectNodeContents(this.text);
    range.collapse(false);
    selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  // ngOnInit(): void {
  //   this.editor = new Editor();
  // }

  // // make sure to destory the editor
  // ngOnDestroy(): void {
  //   this.editor.destroy();
  // }
}
