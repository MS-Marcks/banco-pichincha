import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [SearchBarComponent, ModalComponent, DropdownComponent, ToastComponent],
  exports: [SearchBarComponent, ModalComponent, DropdownComponent, ToastComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
