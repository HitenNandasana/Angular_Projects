import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

  taskList: any = [];
  id: any;
  List1: any;
  List2: any

  constructor(public dialog: MatDialog,
    private taskservice: TaskService,
  ) {
    if (localStorage.getItem('List') === null || localStorage.getItem('List') == undefined) {
      this.taskservice.setTaskData([]);
      return;
    }
    this.setList();
  }

  drop(event: any) {
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
    let array = event.previousContainer.connectedTo[1].data.concat(event.container.connectedTo[0].data);
    this.arrangeData(array);
  }

  add() {
    this.taskList = this.taskservice.getTaskData();
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      // data: name,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        if (Object.keys(this.taskList).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...this.taskList.map((task: any) => task.id)) + 1;
        }
        let obj = {
          id: this.id,
          name: result.value.name,
          image: result.value.image.name,
          seqNo: this.taskList.length + 1
        }
        this.taskList.push(obj);
        this.taskservice.setTaskData(this.taskList);
        this.setList();
      }
    });
  }

  deleteTask(obj: any) {
    if (confirm('Do You Really Want to Delete this?')) {
      this.taskList = this.taskservice.getTaskData();
      this.taskList.forEach((res: any, index: any) => {
        if (obj.id === res.id) {
          this.taskList.splice(index, 1);
        }
      });
      this.taskservice.setTaskData(this.taskList);
    }
    let data = this.taskservice.getTaskData();
    this.arrangeData(data);
  }

  arrangeData(arrayData: any) {
    let arr1 = arrayData.map((obj: any, index: any) => {
      return { ...obj, seqNo: index + 1 }
    });
    this.taskservice.setTaskData(arr1);
    this.setList();
  }

  setList() {
    this.taskList = this.taskservice.getTaskData();
    this.List1 = this.taskList.slice(0, Math.ceil(this.taskList.length / 2));
    this.List2 = this.taskList.slice(Math.ceil(this.taskList.length / 2));
  }
}
