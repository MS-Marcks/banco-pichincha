import { Component, EventEmitter, Output } from '@angular/core';
import { IDropDown } from 'src/app/shared/interfaces/idrop-down';

@Component({
  selector: 'financial-products-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Output("dropDown") dropDown: EventEmitter<IDropDown> = new EventEmitter<IDropDown>();

  actionDropDown(action: string, data: string): void {
    this.dropDown.emit({ action, data });
  }

}
