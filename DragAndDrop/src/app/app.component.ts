import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './appServices/task.service';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DragAndDrop';

  List: any = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']
  taskList: any = [];
  id: number = 1;
  List1: any;
  List2: any

  constructor(public dialog: MatDialog,
    private taskservice: TaskService) {

    if (localStorage.getItem('List') === null || localStorage.getItem('List') == undefined) {
      this.taskservice.setTaskData([]);
      return;
    }
    // this.taskList = this.taskservice.getTaskData();

    for (let i = 0; i < this.List.length; i++) {
      let obj = {
        id: i + 1,
        name: this.List[i],
        seqNo: i + 1
      }
      this.taskList.push(obj)
      this.id = this.id + 1;
    }
    this.taskservice.setTaskData(this.taskList)
    this.id = 1;
    this.List1 = this.taskList.slice(0, this.taskList.length / 2);
    this.List2 = this.taskList.slice(this.taskList.length / 2);
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    let a1 = event.container.data;
    let a2 = event.previousContainer.data;
    let arr: any;
    if (event.previousContainer.id === event.container.id) {
      if (event.container.id === 'cdk-drop-list-0') {
        arr = a2.concat(this.List2);
      } else {
        arr = this.List1.concat(a2);
      }
    } else {
      if (event.container.id === 'cdk-drop-list-0') {
        arr = a1.concat(a2);
      } else {
        arr = a2.concat(a1);
      }
    }

    let i = 0;
    let arr1 = arr.map((obj: any) => {
      i = i + 1;
      return { ...obj, seqNo: i }
    })
    this.taskservice.setTaskData(arr1);

    this.List1 = arr1.slice(0, arr1.length / 2);
    this.List2 = arr1.slice(arr1.length / 2);
  }

  // add() {
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     data: { task: this.task },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     console.log('The dialog was closed');
  //     // this.task = result;
  //     // this.task.push(result);
  //   });
  // }
}
