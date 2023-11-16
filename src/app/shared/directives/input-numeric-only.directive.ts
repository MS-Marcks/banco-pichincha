import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[InputNumericOnly]'
})
export class InputNumericOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener("input", ["$event"]) onInput(event: Event): void {
    const input = event as InputEvent;
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, "");

    if (initialValue !== this.el.nativeElement.value) {
      this.el.nativeElement.dispatchEvent(new Event("input"));
    }
  }

}
