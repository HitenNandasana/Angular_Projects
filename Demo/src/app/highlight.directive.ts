import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(public el: ElementRef) {
  }
  @Input() appHighlight = '';
  @Input() defaultHighlight = 'blue';

  @HostListener('mouseenter') onMouseEnter(){
    this.highlight(this.appHighlight || this.defaultHighlight);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.highlight('');
  }

  // @HostListener('click') onClick(){
  //   this.highlight(this.appHighlight || this.defaultHighlight);
  // }

  private highlight(color : string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
