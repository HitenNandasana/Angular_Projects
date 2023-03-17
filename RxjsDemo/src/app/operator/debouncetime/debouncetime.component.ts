import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-debouncetime',
  templateUrl: './debouncetime.component.html',
  styleUrls: ['./debouncetime.component.scss']
})
export class DebouncetimeComponent implements AfterViewInit {

  @ViewChild('myInput') myInput: ElementRef | undefined;
  constructor() { }

  search: any
  ngAfterViewInit(): void {


    fromEvent<any>(this.myInput?.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    )
      .subscribe(res => {
        console.log(res);
        this.search = res
      })
  }

}
