import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { FinancialProductsComponent } from './pages/financial-products/financial-products.component';
import { TableComponent } from './components/table/table.component';
import { FinancialProductsFormComponent } from './pages/financial-products-form/financial-products-form.component';



@NgModule({
  declarations: [
    FinancialProductsComponent,
    TableComponent,
    FinancialProductsFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FinancialProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ], providers: [DatePipe]
})
export class FinancialProductsModule { }
