import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {

  actionName = 'color:red';
  SingleCls = 'cls';
  MultiCls = 'mul1 cls';
  bg = 'cornflowerblue';
  MulStyle = { backgroundColor: 'yellow', fontSize: '20px', marginTop: '20px', outline: '10px double blue', width: '350px' };
  name = '';
  isChanged = true;

  event(){
    alert("This is event binging")
  }
  getName(event:Event){
    return (event.target as HTMLInputElement).value;
  }
}

