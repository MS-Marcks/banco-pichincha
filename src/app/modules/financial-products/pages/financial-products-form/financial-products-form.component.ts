import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EActionForm } from 'src/app/configs/eaction-form';
import { EToast } from 'src/app/configs/etoast';
import { PreloadScreenService } from 'src/app/core/preload-screen/preload-screen.service';
import { FinancialProductsService } from 'src/app/core/services/financial-products.service';
import { SpecialValidations } from 'src/app/core/validators/special-validations';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { IFinancialProducts } from 'src/app/shared/interfaces/ifinancial-products';

@Component({
  selector: 'financial-products-form',
  templateUrl: './financial-products-form.component.html',
  styleUrls: ['./financial-products-form.component.css']
})
export class FinancialProductsFormComponent {


  action: string = EActionForm.SAVE;

  form: FormGroup = this.fb.group({
    id: [, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: [, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: [, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: [, [Validators.required, SpecialValidations.url("logo")]],
    date_release: [, [Validators.required, SpecialValidations.currentOrLaterDate('date_release')]],
    date_revision: [, [Validators.required]]
  });


  constructor(private fb: FormBuilder,
    private financialProductsService: FinancialProductsService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private preloadScreenService: PreloadScreenService) {
    const item = this.route.snapshot.root.queryParams["product"];
    if (item !== undefined) {
      const product: IFinancialProducts = JSON.parse(atob(item));
      this.form.controls["id"].setValue(product.id);
      this.form.controls["name"].setValue(product.name);
      this.form.controls["description"].setValue(product.description);
      this.form.controls["logo"].setValue(product.logo);
      this.form.controls["date_release"].setValue(datePipe.transform(product.date_release, 'yyyy-MM-dd', 'UTC'));
      this.form.controls["date_revision"].setValue(datePipe.transform(product.date_revision, 'yyyy-MM-dd', 'UTC'));
      this.form.controls["id"].disable();
      this.action = EActionForm.EDIT;
    }
  }

  setDateRevision(event: any): void {
    if (event.target.value === "") return;
    const dateRelease = new Date(event.target.value);
    const dateNow = new Date();
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    dateRelease.setDate(dateRelease.getDate() + 1);
    dateNow.setHours(17, 0, 0, 0);
    if (dateNow >= dateRelease) {
      this.form.controls["date_revision"].setValue(``);
      return;
    }
    const dateRevision = new Date(dateRelease.setFullYear(dateRelease.getFullYear() + 1));
    this.form.controls["date_revision"].setValue(`${dateRevision.getFullYear()}-${fixedDate(dateRevision.getMonth() + 1)}-${fixedDate(dateRevision.getDate())}`);
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      this.toastService.showToast({ type: EToast.DANGER, message: "Error: Rellene todos los datos faltantes" });
      this.form.markAllAsTouched();
      return;
    }
    try {
      this.preloadScreenService.show();
      const isExistProduct = await this.financialProductsService.verificationProductById(this.form.get("id")?.value);
      if (this.action === EActionForm.SAVE) {
        if (isExistProduct) return this.toastService.showToast({ type: EToast.DANGER, message: "Error: El producto ya existe" });
        await this.financialProductsService.Post(this.form.value);
        this.resetForm();
        this.toastService.showToast({ type: EToast.SUCCESS, message: "Exito: Se ha creado el producto" });
        return;
      }
      if (this.action === EActionForm.EDIT) {
        if (!isExistProduct) return this.toastService.showToast({ type: EToast.DANGER, message: "Error: El producto ya no existe" });
        let request = this.form.value;
        request.id = this.form.get("id")?.value
        await this.financialProductsService.Put(request);
        this.toastService.showToast({ type: EToast.SUCCESS, message: "Exito: Se ha editado el producto" });
        return;
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      this.preloadScreenService.hide();
    }
  }


  resetForm(): void {
    this.form.reset();
    this.form.controls["id"].enable();
  }

}
