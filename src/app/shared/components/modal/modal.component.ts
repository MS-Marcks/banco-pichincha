import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input("title") title: string = "";
  @Output("close") close: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeModal() {
    this.close.emit(false);
  }
}
