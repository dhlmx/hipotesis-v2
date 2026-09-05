import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[textSuper]',
})
export class TextSuper {
  element: HTMLElement;

  constructor(private readonly el: ElementRef) {
    this.element = this.el.nativeElement;
    this.element.style.verticalAlign = 'super';
    this.element.style.fontSize = 'smaller';
  }
}
