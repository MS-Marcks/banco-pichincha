import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialProductsComponent } from './pages/financial-products/financial-products.component';
import { FinancialProductsFormComponent } from './pages/financial-products-form/financial-products-form.component';

const routes: Routes = [
  { path: "", component: FinancialProductsComponent },
  { path: "form", component: FinancialProductsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialProductsRoutingModule { }
