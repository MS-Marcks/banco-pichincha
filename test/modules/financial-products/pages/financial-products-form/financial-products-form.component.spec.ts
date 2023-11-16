import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialProductsFormComponent } from '../../../../../src/app/modules/financial-products/pages/financial-products-form/financial-products-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../../../src/app/app-routing.module';
import { SharedModule } from '../../../../../src/app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('FinancialProductsFormComponent', () => {
  let component: FinancialProductsFormComponent;
  let fixture: ComponentFixture<FinancialProductsFormComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsFormComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
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

  test('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  test('Error cuando se envie todo el formulario vacio', () => {
    component.onSubmit();
    fixture.detectChanges();
    const id = compiled.querySelector("#id-help");
    const name = compiled.querySelector("#name-help");
    expect(id?.textContent).toContain("ID no válido!");
    expect(name?.textContent).toContain("Nombre no válido!");
  });
});
