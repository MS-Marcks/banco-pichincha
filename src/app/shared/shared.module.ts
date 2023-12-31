import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToastComponent } from './components/toast/toast.component';
import { InputNumericOnlyDirective } from './directives/input-numeric-only.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    ModalComponent,
    DropdownComponent,
    ToastComponent,
    TooltipComponent,
    InputNumericOnlyDirective
  ],
  exports: [
    SearchBarComponent,
    ModalComponent,
    DropdownComponent,
    ToastComponent,
    TooltipComponent,
    InputNumericOnlyDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
