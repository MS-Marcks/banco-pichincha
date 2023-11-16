import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropDown } from 'src/app/shared/interfaces/idrop-down';
import { IFinancialProducts } from 'src/app/shared/interfaces/ifinancial-products';

@Component({
  selector: 'financial-products-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  @Input("dataSource") dataSource: IFinancialProducts[] | undefined;
  @Output("dropDown") dropDown: EventEmitter<IDropDown> = new EventEmitter<IDropDown>();

  loadNewData: boolean = false;
  dataSourceDisplay: IFinancialProducts[] | undefined;

  ngOnInit(): void {
    this.loadNewData = true;
  }

  actionDropDown(action: string, data: string[]): void {
    this.dropDown.emit({ action, data });
  }

  setNewDataSource(event: IFinancialProducts[]): void {
    this.dataSourceDisplay = event;
  }

}
