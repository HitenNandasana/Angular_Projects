import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTest]',
  standalone: true,
})
export class TestDirective {

  @Input() color = 'red'
  constructor(private el: ElementRef) {

    // this.el.nativeElement.style.color = this.color
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
