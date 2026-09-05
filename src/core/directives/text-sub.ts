import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[textSub]',
})
export class TextSub {
  element: HTMLElement;

  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
    this.element.style.verticalAlign = 'sub';
    this.element.style.fontSize = 'smaller';
  }
}
