import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from '../../../../../src/app/modules/financial-products/components/table/table.component';
import { SharedModule } from '../../../../../src/app/shared/shared.module';

const DATA = [
  {
    id: "tjr-card999",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card998",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card997",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card999",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card998",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card997",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }
]
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [SharedModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test("Validar: Aceptado que debe de aparecer la tabla y su información", () => {
    component.dataSource = DATA
    component.ngOnInit();
    component.loadNewData = true;
    fixture.detectChanges();
    const table = compiled.querySelectorAll("[class=table]");
    expect(table[0].rows.length).toBe(6);
  });

  test("Validar: Aceptado que debe de avanzar al hacer click el boton siguiente de la parte de paginación", () => {
    component.dataSource = DATA
    component.ngOnInit();
    component.loadNewData = true;
    fixture.detectChanges();
    const btnNext = compiled.querySelector("[data-test=page-next]");
    btnNext?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    const table = compiled.querySelectorAll("[class=table]");
    expect(table[0].rows.length).toBe(2);
  });

  test("Validar: Aceptado que debe de retroceder al hacer click el boton Anterior de la parte de paginación", () => {
    component.dataSource = DATA
    component.ngOnInit();
    component.loadNewData = true;
    fixture.detectChanges();
    const btnNext = compiled.querySelector("[data-test=page-next]");
    const btnBack = compiled.querySelector("[data-test=page-back]");
    btnNext?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    const table = compiled.querySelectorAll("[class=table]");
    expect(table[0].rows.length).toBe(2);
    btnBack?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(table[0].rows.length).toBe(6);
  });

  test("Validar: Aceptado que debe cambiar el numero de item en la tabla por cambio en el valor de la paginación (select option 10)", () => {
    component.dataSource = DATA
    component.ngOnInit();
    component.loadNewData = true;
    fixture.detectChanges();
    const select = compiled.querySelector("[data-test=itemforpage]");
    select.value = 10;
    select?.dispatchEvent(new Event("change"));
    fixture.detectChanges();
    const table = compiled.querySelectorAll("[class=table]");
    expect(table[0].rows.length).toBe(7);
  });

});

