import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter (){
    this.el.nativeElement.style.backgroundColor = 'red'
  }

  @HostListener('mouseleave') onMouseLeave (){
    this.el.nativeElement.style.backgroundColor = ''
  }

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private el: ElementRef) {

    /* this.el.nativeElement.style.backgroundColor = 'red' */

   }



}
