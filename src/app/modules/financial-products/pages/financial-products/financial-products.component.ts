import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EDropDown } from '../../../../configs/edrop-down';
import { EToast } from '../../../../configs/etoast';
import { PreloadScreenService } from '../../../../core/preload-screen/preload-screen.service';
import { FinancialProductsService } from '../../../../core/services/financial-products.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { IDropDown } from '../../../../shared/interfaces/idrop-down';
import { IFinancialProducts } from '../../../../shared/interfaces/ifinancial-products';

@Component({
  selector: 'app-financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.css']
})
export class FinancialProductsComponent implements OnInit {

  modalIsVisible: boolean = false;
  dataSourceShadow: IFinancialProducts[] | undefined;
  dataSource: IFinancialProducts[] | undefined;
  selectedProduct: IFinancialProducts | undefined;

  constructor(private router: Router,
    private financialProductsService: FinancialProductsService,
    private toastService: ToastService,
    private preloadScreenService: PreloadScreenService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    try {
      this.preloadScreenService.show();
      const res = await this.financialProductsService.Get();
      this.dataSource = res;
      this.dataSourceShadow = res;
    } catch (error: any) {
      console.error(error)
    } finally {
      this.preloadScreenService.hide();
    }
  }

  async deleteProduct(): Promise<void> {
    if (this.selectedProduct === undefined) return;
    try {
      const isExistProduct = await this.financialProductsService.verificationProductById(this.selectedProduct.id);
      if (!isExistProduct) return this.toastService.showToast(EToast.DANGER,"Error: El producto no existe");
      this.preloadScreenService.show();
      await this.financialProductsService.Delete(`id=${this.selectedProduct.id}`);
      this.toastService.showToast(EToast.SUCCESS,"Se ha eliminado exitosamente");
      this.closeModal(true);
    } catch (error: any) {
      console.log(error);
    } finally {
      await this.getProducts();
      this.preloadScreenService.hide();
    }
  }


  actionDropDown(event: IDropDown): void {
    if (event.action === EDropDown.EDIT) {
      this.router.navigate(["/products/form/" + event.data], {
        queryParams: { product: btoa(JSON.stringify(this.dataSource?.find((e: IFinancialProducts) => e.id === event.data[0]))) }
      });
      return;
    }
    if (event.action === EDropDown.DELETE) {
      this.selectedProduct = this.dataSource?.find((e: IFinancialProducts) => e.id === event.data[0]);
      this.modalIsVisible = true;
      return;
    }
  }

  closeModal(event: boolean) {
    this.modalIsVisible = !event;
    this.selectedProduct = undefined;
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  search(event: string): void {
    console.log(event)
    if (event.trim() === "") {
      this.dataSource = this.dataSourceShadow;
      return;
    };
    this.dataSource = this.dataSourceShadow?.filter(item => Object.values(item).some(value => value.toLowerCase().includes(event.toLocaleLowerCase())));
  }

}
