import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EActionForm } from '../../../../configs/eactionform';
import { EToast } from '../../../../configs/etoast';
import { PreloadScreenService } from '../../../../core/preload-screen/preload-screen.service';
import { FinancialProductsService } from '../../../../core/services/financial-products.service';
import { SpecialValidations } from '../../../../core/validators/special-validations';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { IFinancialProducts } from '../../../../shared/interfaces/ifinancial-products';

@Component({
  selector: 'financial-products-form',
  templateUrl: './financial-products-form.component.html',
  styleUrls: ['./financial-products-form.component.css']
})
export class FinancialProductsFormComponent {


  action: string = EActionForm.SAVE;
  dateReleaseUpdate?: any;

  form: FormGroup = this.fb.group({
    id: [, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: [, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: [, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: [, [Validators.required, SpecialValidations.url("logo")/* validación especial */]],
    date_release: [, [Validators.required]],
    date_revision: [, [Validators.required]]
  });


  constructor(private fb: FormBuilder,
    private financialProductsService: FinancialProductsService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private preloadScreenService: PreloadScreenService) {

    // obtención del producto si va a editat
    const item = this.route.snapshot.root.queryParams["product"];
    if (item !== undefined) {
      const product: IFinancialProducts = JSON.parse(atob(item));
      this.form.controls["id"].setValue(product.id);
      this.form.controls["name"].setValue(product.name);
      this.form.controls["description"].setValue(product.description);
      this.form.controls["logo"].setValue(product.logo);
      this.form.controls["date_release"].setValue(datePipe.transform(product.date_release, 'yyyy-MM-dd', 'UTC'));
      this.dateReleaseUpdate = product.date_release;
      this.form.controls["date_release"].setValidators(SpecialValidations.currentOrLaterDate('date_release', this.dateReleaseUpdate)); /* validación especial */
      this.form.controls["date_revision"].setValue(datePipe.transform(product.date_revision, 'yyyy-MM-dd', 'UTC'));
      this.form.controls["id"].disable();
      this.action = EActionForm.EDIT;
    } else {
      this.form.controls["date_release"].setValidators(SpecialValidations.currentOrLaterDate('date_release')); /* validación especial */
    }
  }

  //función para establecer la fecha de revisión
  setDateRevision(event: any): void {
    if (event.target.value === "") return;

    let dateCurrentUpdate = new Date();
    // si esta en modo editar que y la fecha es anterior deja pasar
    if (this.dateReleaseUpdate !== undefined) {
      dateCurrentUpdate = new Date(this.dateReleaseUpdate);
      dateCurrentUpdate.setDate(dateCurrentUpdate.getDate() + 1);
    }
    const dateRelease = new Date(event.target.value);
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    dateRelease.setDate(dateRelease.getDate() + 1);

    // si esta en modo editar que y la fecha es anterior deja pasar
    if (dateRelease.getTime() >= dateCurrentUpdate.getTime()) {
      // setea el nuevo valor
      const dateRevision = new Date(dateRelease.setFullYear(dateRelease.getFullYear() + 1));
      this.form.controls["date_revision"].setValue(`${dateRevision.getFullYear()}-${fixedDate(dateRevision.getMonth() + 1)}-${fixedDate(dateRevision.getDate())}`);
      return;
    }

    // verifica si la fecha es posterior o igual
    const dateNow = new Date();
    dateNow.setHours(17, 0, 0, 0);
    if (dateNow.getTime() >= dateRelease.getTime()) {
      this.form.controls["date_revision"].setValue(``);
      return;
    }
    // setea el nuevo valor
    const dateRevision = new Date(dateRelease.setFullYear(dateRelease.getFullYear() + 1));
    this.form.controls["date_revision"].setValue(`${dateRevision.getFullYear()}-${fixedDate(dateRevision.getMonth() + 1)}-${fixedDate(dateRevision.getDate())}`);
  }

  // función para activar el formulario
  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      this.toastService.showToast(EToast.DANGER, "Error: Rellene todos los datos faltantes");
      this.form.markAllAsTouched();
      return;
    }
    let successUpdate = false;
    try {
      this.preloadScreenService.show();

      // obtiene si existe o no existe el producto
      const isExistProduct = await this.financialProductsService.verificationProductById(this.form.get("id")?.value);

      // esta en modo guadar
      if (this.action === EActionForm.SAVE) {
        //retorna si existe
        if (isExistProduct) {
          return this.toastService.showToast(EToast.DANGER, "Error: El producto ya existe");
        };
        await this.financialProductsService.Post(this.form.value); // guarda el producto
        this.resetForm();
        this.toastService.showToast(EToast.SUCCESS, "Exito: Se ha creado el producto");
        return;
      }

      // esta en modo editar
      if (this.action === EActionForm.EDIT) {
        //retorna sino existe
        if (!isExistProduct) {
          successUpdate = true;
          return this.toastService.showToast(EToast.DANGER, "Error: El producto ya no existe");
        };
        let request = this.form.value;
        request.id = this.form.get("id")?.value
        await this.financialProductsService.Put(request); // actualiza el producto
        this.toastService.showToast(EToast.SUCCESS, "Exito: Se ha editado el producto");
        successUpdate = true;
        return;
      }
    } catch (error: any) {
      this.toastService.showToast(EToast.DANGER, "Error crítico: Comuniquese con el administrador");
    } finally {
      this.preloadScreenService.hide();
      if (successUpdate) {
        this.router.navigateByUrl("/product");
      }
    }
  }

  // función para resear el formulario
  resetForm(): void {
    this.form.reset();
    this.form.controls["id"].enable();
  }

}
