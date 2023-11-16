import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {

  @Input("message") message: string = "";

  isTooltipVisible = false;

  toggleTooltip() {
    this.isTooltipVisible = !this.isTooltipVisible;
  }
}
