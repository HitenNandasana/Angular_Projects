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
    this.taskList = this.taskservice.getTaskData();
    console.log('h');
    console.log(this.taskList);
    this.List1 = this.taskList.slice(0, this.taskList.length / 2);
    this.List2 = this.taskList.slice(this.taskList.length / 2);
  }


  drop(event: any) {
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

    let array = event.previousContainer.connectedTo[1].data.concat(event.container.connectedTo[0].data);

    let arr1: any[] = [];
    array.forEach((obj: any, index: any) => {
      let a = {
        id: obj.id,
        name: obj.name,
        seqNo: index + 1
      }
      arr1.push(a);
    });
    this.taskservice.setTaskData(arr1);

    this.List1 = arr1.slice(0, arr1.length / 2);
    this.List2 = arr1.slice(arr1.length / 2);
  }

  add() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { List: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.List.push(result)
      console.log(this.List);
      this.taskservice.setTaskData(this.List);
      console.log(this.taskservice.getTaskData());
    });
  }
}
