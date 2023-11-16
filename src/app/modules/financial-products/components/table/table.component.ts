import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDropDown } from '../../../../shared/interfaces/idrop-down';
import { IFinancialProducts } from '../../../../shared/interfaces/ifinancial-products';

@Component({
  selector: 'financial-products-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnChanges {


  @Input("dataSource") dataSource: IFinancialProducts[] | any;
  @Output("dropDown") dropDown: EventEmitter<IDropDown> = new EventEmitter<IDropDown>();

  loadNewData: boolean = false;
  dataSourceDisplay: IFinancialProducts[] | undefined;

  totalPages: number = -1;
  currentPage: number = 1;
  itemForPage: number = 5;
  results: number = 1;

  ngOnInit(): void {
    this.loadNewData = true;
    this.setNewParameters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      this.setNewParameters()
    }
  }

  actionDropDown(action: string, data: string[]): void {
    this.dropDown.emit({ action, data });
  }

  onSelectedItemForPage(event: any): void {
    try {
      this.itemForPage = parseInt(event.target.value);
    } catch (error) {
      this.itemForPage = 5;
    } finally {
      this.setNewParameters()
    }
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.getItemCurrentPage();
    }
  }

  back(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getItemCurrentPage();
    }
  }

  setNewParameters(): void {
    this.totalPages = Math.ceil(this.dataSource.length / this.itemForPage);
    this.currentPage = 1;
    this.getItemCurrentPage();
  }

  getItemCurrentPage(): void {
    const begin = (this.currentPage - 1) * this.itemForPage;
    const end = begin + this.itemForPage;
    const items = this.dataSource.slice(begin, end);
    this.results = items.length;
    this.dataSourceDisplay = items;
  }

}


