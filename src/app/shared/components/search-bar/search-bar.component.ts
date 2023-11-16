import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output("search") search: EventEmitter<string> = new EventEmitter<string>();

  onChange(event: any): void {
    try {
      this.search.emit(event.target.value);
    } catch (error) {
      this.search.emit("");
    }
  }
}
