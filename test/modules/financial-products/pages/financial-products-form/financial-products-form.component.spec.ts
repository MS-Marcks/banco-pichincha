import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialProductsFormComponent } from '../../../../../src/app/modules/financial-products/pages/financial-products-form/financial-products-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../../../../src/app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { EActionForm } from '../../../../../src/app/configs/eactionform';

const DATA = {
  id: "tjr-card999",
  name: "12345",
  description: "Mastercard y Visa",
  logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  date_release: new Date(),
  date_revision: new Date()
}

describe('FinancialProductsFormComponent', () => {
  let component: FinancialProductsFormComponent;
  let fixture: ComponentFixture<FinancialProductsFormComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsFormComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [DatePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Rechazar el envio del formulario vacio', () => {
    component.onSubmit();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    const name = compiled.querySelector("#name-help");
    const description = compiled.querySelector("#description-help");
    const logo = compiled.querySelector("#logo-help");
    const date_release = compiled.querySelector("#date_release-help");

    expect(id?.textContent).toContain("ID no válido!");
    expect(name?.textContent).toContain("Nombre no válido!");
    expect(description?.textContent).toContain("Descripción no valida!");
    expect(logo?.textContent).toContain("Enlace no valido!");
    expect(date_release?.textContent).toContain("Fecha de liberación no valida!");
  });
  /* ========================== */
  test('Validar: Rechazado por rango del ID (3-10)', () => {
    component.form.get("id")?.setValue("1");
    component.form.get("id")?.markAsTouched();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    expect(id?.textContent).toContain("ID no válido!");
  });
  test('Validar: Aceptado por rango del ID (3-10)', () => {
    component.form.get("id")?.setValue("123");
    component.form.get("id")?.markAsTouched();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    expect(id?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por rango del name (5-100)', () => {
    component.form.get("name")?.setValue("1");
    component.form.get("name")?.markAsTouched();
    fixture.detectChanges();
    const name = compiled.querySelector("#name-help");
    expect(name?.textContent).toContain("Nombre no válido!");
  });
  test('Validar: Aceptado por rango del name (5-100)', () => {
    component.form.get("name")?.setValue("12345");
    component.form.get("name")?.markAsTouched();
    fixture.detectChanges();
    const name = compiled.querySelector("#name-help");
    expect(name?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por rango del description (10-200)', () => {
    component.form.get("description")?.setValue("1");
    component.form.get("description")?.markAsTouched();
    fixture.detectChanges();
    const description = compiled.querySelector("#description-help");
    expect(description?.textContent).toContain("Descripción no valida!");
  });
  test('Validar: Aceptado por rango del description (10-200)', () => {
    component.form.get("description")?.setValue("Visa y Mastercard");
    component.form.get("description")?.markAsTouched();
    fixture.detectChanges();
    const description = compiled.querySelector("#description-help");
    expect(description?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado el tipo de informcion ingresado en el logo (url)', () => {
    component.form.get("logo")?.setValue("1");
    component.form.get("logo")?.markAsTouched();
    fixture.detectChanges();
    const logo = compiled.querySelector("#logo-help");
    expect(logo?.textContent).toContain("Enlace no valido!");
  });
  test('Validar: Aceptado el tipo de informcion ingresado en el logo (url)', () => {
    component.form.get("logo")?.setValue("https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg");
    component.form.get("logo")?.markAsTouched();
    fixture.detectChanges();
    const logo = compiled.querySelector("#logo-help");
    expect(logo?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por ingresar una fecha anterior a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() - 2);
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toContain("Fecha de liberación no valida!");
  });
  test('Validar: Aceptado por ingresar una fecha igual a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate());
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toBeUndefined();
  });
  test('Validar: Aceptado por ingresar una fecha posterior a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() + 1);
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toBeUndefined();
  });

  test('Validar: Aceptado Activar la función resetForm()', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() + 1);
    component.form.get("id")?.setValue("123");
    component.form.get("name")?.setValue("12345");
    component.form.get("description")?.setValue("Visa y Mastercard");
    component.form.get("logo")?.setValue("https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg");
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.markAllAsTouched();
    fixture.detectChanges();

    const id = compiled.querySelector("#id-help");
    const name = compiled.querySelector("#name-help");
    const description = compiled.querySelector("#description-help");
    const logo = compiled.querySelector("#logo-help");
    const date_release = compiled.querySelector("#date_release-help");

    expect(id?.textContent).toBeUndefined();
    expect(name?.textContent).toBeUndefined();
    expect(description?.textContent).toBeUndefined();
    expect(logo?.textContent).toBeUndefined();
    expect(date_release?.textContent).toBeUndefined();

    component.resetForm();

    expect(component.form.get("id")?.value).toBeNull()
    expect(component.form.get("name")?.value).toBeNull()
    expect(component.form.get("description")?.value).toBeNull()
    expect(component.form.get("logo")?.value).toBeNull()
    expect(component.form.get("date_release")?.value).toBeNull()
  });
});

describe('FinancialProductsFormComponent', () => {
  let component: FinancialProductsFormComponent;
  let fixture: ComponentFixture<FinancialProductsFormComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsFormComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [DatePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Rechazar el envio del formulario vacio', () => {
    component.onSubmit();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    const name = compiled.querySelector("#name-help");
    const description = compiled.querySelector("#description-help");
    const logo = compiled.querySelector("#logo-help");
    const date_release = compiled.querySelector("#date_release-help");

    expect(id?.textContent).toContain("ID no válido!");
    expect(name?.textContent).toContain("Nombre no válido!");
    expect(description?.textContent).toContain("Descripción no valida!");
    expect(logo?.textContent).toContain("Enlace no valido!");
    expect(date_release?.textContent).toContain("Fecha de liberación no valida!");
  });
  /* ========================== */
  test('Validar: Rechazado por rango del ID (3-10)', () => {
    component.form.get("id")?.setValue("1");
    component.form.get("id")?.markAsTouched();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    expect(id?.textContent).toContain("ID no válido!");
  });
  test('Validar: Aceptado por rango del ID (3-10)', () => {
    component.form.get("id")?.setValue("123");
    component.form.get("id")?.markAsTouched();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    expect(id?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por rango del name (5-100)', () => {
    component.form.get("name")?.setValue("1");
    component.form.get("name")?.markAsTouched();
    fixture.detectChanges();
    const name = compiled.querySelector("#name-help");
    expect(name?.textContent).toContain("Nombre no válido!");
  });
  test('Validar: Aceptado por rango del name (5-100)', () => {
    component.form.get("name")?.setValue("12345");
    component.form.get("name")?.markAsTouched();
    fixture.detectChanges();
    const name = compiled.querySelector("#name-help");
    expect(name?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por rango del description (10-200)', () => {
    component.form.get("description")?.setValue("1");
    component.form.get("description")?.markAsTouched();
    fixture.detectChanges();
    const description = compiled.querySelector("#description-help");
    expect(description?.textContent).toContain("Descripción no valida!");
  });
  test('Validar: Aceptado por rango del description (10-200)', () => {
    component.form.get("description")?.setValue("Visa y Mastercard");
    component.form.get("description")?.markAsTouched();
    fixture.detectChanges();
    const description = compiled.querySelector("#description-help");
    expect(description?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado el tipo de informcion ingresado en el logo (url)', () => {
    component.form.get("logo")?.setValue("1");
    component.form.get("logo")?.markAsTouched();
    fixture.detectChanges();
    const logo = compiled.querySelector("#logo-help");
    expect(logo?.textContent).toContain("Enlace no valido!");
  });
  test('Validar: Aceptado el tipo de informcion ingresado en el logo (url)', () => {
    component.form.get("logo")?.setValue("https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg");
    component.form.get("logo")?.markAsTouched();
    fixture.detectChanges();
    const logo = compiled.querySelector("#logo-help");
    expect(logo?.textContent).toBeUndefined();
  });
  /* ========================== */
  test('Validar: Rechazado por ingresar una fecha anterior a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() - 2);
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toContain("Fecha de liberación no valida!");
  });
  test('Validar: Aceptado por ingresar una fecha igual a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate());
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toBeUndefined();
  });
  test('Validar: Aceptado por ingresar una fecha posterior a la fecha actual en date_release (Date)', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() + 1);
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.get("date_release")?.markAsTouched();
    fixture.detectChanges();
    const date_release = compiled.querySelector("#date_release-help");
    expect(date_release?.textContent).toBeUndefined();
  });

  test('Validar: Aceptado Activar la función resetForm()', () => {
    const fixedDate = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
    let dateRelease = new Date();
    dateRelease.setDate(dateRelease.getDate() + 1);
    component.form.get("id")?.setValue("123");
    component.form.get("name")?.setValue("12345");
    component.form.get("description")?.setValue("Visa y Mastercard");
    component.form.get("logo")?.setValue("https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg");
    component.form.get("date_release")?.setValue(`${dateRelease.getFullYear()}-${fixedDate(dateRelease.getMonth() + 1)}-${fixedDate(dateRelease.getDate())}`);
    component.form.markAllAsTouched();
    fixture.detectChanges();

    const id = compiled.querySelector("#id-help");
    const name = compiled.querySelector("#name-help");
    const description = compiled.querySelector("#description-help");
    const logo = compiled.querySelector("#logo-help");
    const date_release = compiled.querySelector("#date_release-help");

    expect(id?.textContent).toBeUndefined();
    expect(name?.textContent).toBeUndefined();
    expect(description?.textContent).toBeUndefined();
    expect(logo?.textContent).toBeUndefined();
    expect(date_release?.textContent).toBeUndefined();

    component.resetForm();

    expect(component.form.get("id")?.value).toBeNull()
    expect(component.form.get("name")?.value).toBeNull()
    expect(component.form.get("description")?.value).toBeNull()
    expect(component.form.get("logo")?.value).toBeNull()
    expect(component.form.get("date_release")?.value).toBeNull()
  });
});


describe('FinancialProductsFormComponenWithRouterWithRouter', () => {
  let component: FinancialProductsFormComponent;
  let fixture: ComponentFixture<FinancialProductsFormComponent>;
  let compiled: HTMLElement;
  let datePipe: DatePipe;
  beforeEach(() => {
    const dumpyDt = {
      snapshot: {
        root: {
          queryParams: {
            product: btoa(JSON.stringify(DATA))
          }
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [FinancialProductsFormComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        DatePipe,
        { provide: ActivatedRoute, useValue: dumpyDt }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductsFormComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })


  test('Validar: Aceptado cargar los datos cuando se desea editar un producto /form/tjr-card999?product="data"', () => {
    const id = compiled.querySelector("[id=id]") as HTMLInputElement;
    const name = compiled.querySelector("[id=name]") as HTMLInputElement;
    const description = compiled.querySelector("[id=description]") as HTMLInputElement;
    const logo = compiled.querySelector("[id=logo]") as HTMLInputElement;
    const date_release = compiled.querySelector("[id=date_release]") as HTMLInputElement;
    const date_release_convert_from_DOM = datePipe.transform(date_release.value, 'yyyy-MM-dd', 'UTC');
    const date_release_convert_from_JSON = datePipe.transform(DATA.date_release, 'yyyy-MM-dd', 'UTC');

    expect(id.value).toBe(DATA.id);
    expect(name.value).toBe(DATA.name);
    expect(description.value).toBe(DATA.description);
    expect(logo.value).toBe(DATA.logo);
    expect(date_release_convert_from_DOM).toBe(date_release_convert_from_JSON);
    expect(component.action).toBe(EActionForm.EDIT)
  });
});
