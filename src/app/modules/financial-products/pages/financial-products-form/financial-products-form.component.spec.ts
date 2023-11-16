import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsFormComponent } from './financial-products-form.component';

describe('FinancialProductsFormComponent', () => {
  let component: FinancialProductsFormComponent;
  let fixture: ComponentFixture<FinancialProductsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsFormComponent]
    });
    fixture = TestBed.createComponent(FinancialProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
