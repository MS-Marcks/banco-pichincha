import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {


  @Input("datasource") dataSource: any;
  @Output("newDataSource") newDataSource = new EventEmitter<any[]>();

  totalPages: number = -1;
  currentPage: number = 1;
  itemForPage: number = 5;
  results: number = 1;

  constructor() { }

  ngOnInit(): void {
    if (this.dataSource !== undefined) {
      this.setNewParameters()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      this.setNewParameters()
    }
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
    console.log(this.itemForPage)
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
    this.newDataSource.emit(items);
  }



}
