import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EDropDown } from 'src/app/configs/edrop-down';
import { EToast } from 'src/app/configs/etoast';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { IDropDown } from 'src/app/shared/interfaces/idrop-down';

@Component({
  selector: 'app-financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.css']
})
export class FinancialProductsComponent {

  modalIsVisible: boolean = false;

  constructor(private router: Router, private toastService: ToastService) { }

  actionDropDown(event: IDropDown): void {
    if (event.action === EDropDown.EDIT) {
      return;
    }
    if (event.action === EDropDown.DELETE) {
      this.modalIsVisible = true;
      return;
    }
  }

  closeModal(event: boolean) {
    this.modalIsVisible = event;
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  toastVisible: boolean = false;
  toastMessage: string = '';


  // this.toastService.showToast({ message: "Se ha Guardado exitosamente", type: EToast.WARNING });

}
