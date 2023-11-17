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
  dataSourceShadow: IFinancialProducts[] | undefined; // Datos completos sin filtrar
  dataSource: IFinancialProducts[] | undefined;// Datos para mostrar con el filtro
  selectedProduct: IFinancialProducts | undefined;

  constructor(private router: Router,
    private financialProductsService: FinancialProductsService,
    private toastService: ToastService,
    private preloadScreenService: PreloadScreenService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // función para obtener los productos financiero
  async getProducts(): Promise<void> {
    try {
      this.preloadScreenService.show();
      const res = await this.financialProductsService.Get();
      this.dataSource = res;
      this.dataSourceShadow = res;
    } catch (error: any) {
      this.toastService.showToast(EToast.DANGER, "Error crítico: Comuniquese con el administrador");
    } finally {
      this.preloadScreenService.hide();
    }
  }

  // función para eliminar un producto
  async deleteProduct(): Promise<void> {
    if (this.selectedProduct === undefined) return;
    try {
      // Validación si existe el producto
      const isExistProduct = await this.financialProductsService.verificationProductById(this.selectedProduct.id);
      if (!isExistProduct) {
        this.closeModal(true); this.toastService.showToast(EToast.DANGER, "Error: El producto no existe")
        return
      }

      this.preloadScreenService.show();
      await this.financialProductsService.Delete(`id=${this.selectedProduct.id}`); // Elimina el producto
      this.toastService.showToast(EToast.SUCCESS, "Se ha eliminado exitosamente"); // Muestra el modal
      this.closeModal(true);
    } catch (error: any) {
      this.toastService.showToast(EToast.DANGER, "Error crítico: Comuniquese con el administrador");
    } finally {
      await this.getProducts();
      this.preloadScreenService.hide();
    }
  }

  // función para activar las funciones de editar o eliminar
  actionDropDown(event: IDropDown): void {
    if (event.action === EDropDown.EDIT) {
      // envia mediante la url el producto en base64
      this.router.navigate(["/products/form/" + event.data], {
        queryParams: { product: btoa(JSON.stringify(this.dataSource?.find((e: IFinancialProducts) => e.id === event.data[0]))) }
      });
      return;
    }
    if (event.action === EDropDown.DELETE) {
      // busca el producto y activa el modal
      this.selectedProduct = this.dataSource?.find((e: IFinancialProducts) => e.id === event.data[0]);
      this.modalIsVisible = true;
      return;
    }
  }

  // función para cerrar el modal
  closeModal(event: boolean) {
    this.modalIsVisible = !event;
    this.selectedProduct = undefined;
  }

  // redireccionar a otro componente
  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  // función para filtrar mediante una cadena de texto
  search(event: string): void {
    if (event.trim() === "") {
      this.dataSource = this.dataSourceShadow;
      return;
    };
    this.dataSource = this.dataSourceShadow?.filter(item => Object.values(item).some(value => value.toString().toLowerCase().includes(event.toLowerCase())));
  }

}
