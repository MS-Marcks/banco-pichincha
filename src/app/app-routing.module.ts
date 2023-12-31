import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "products", pathMatch: "full" },
  { path: "products", loadChildren: () => import("./modules/financial-products/financial-products.module").then(m => m.FinancialProductsModule) },
  { path: "**", redirectTo: "products", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
