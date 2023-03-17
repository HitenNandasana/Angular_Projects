import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CombineLatestComponent implements AfterViewInit {

  name = ['hiten', 'sagar', 'jay', 'abc'];

  color = ['red', 'blue', 'green'];

  @ViewChild('first') first: ElementRef | undefined;
  @ViewChild('second') second: ElementRef | undefined;

  constructor() { }

  ngAfterViewInit(): void {

    const nameobs = fromEvent<any>(this.first?.nativeElement, 'change').pipe(
      map(e => e.target.value)
    )
    const colorobs = fromEvent<any>(this.second?.nativeElement, 'change').pipe(
      map(e => e.target.value)
    )


    nameobs.pipe(withLatestFrom(colorobs)).subscribe(([name, color]) => {
      console.log(name, color);

      this.displayName(name, color, 'combine');
    })
  }

  displayName(name: any, color: any, id: any) {
    let el = document.createElement('div');
    el.innerText = name;
    el.setAttribute('class', color);
    document.getElementById(id)?.appendChild(el);
  }

}
