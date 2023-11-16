import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PreloadScreenComponent } from './preload-screen/preload-screen.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PreloadScreenComponent,
  ],
  exports: [
    HeaderComponent,
    PreloadScreenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
