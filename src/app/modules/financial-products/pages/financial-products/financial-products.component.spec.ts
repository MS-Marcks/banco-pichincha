import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsComponent } from './financial-products.component';

describe('FinancialProductsComponent', () => {
  let component: FinancialProductsComponent;
  let fixture: ComponentFixture<FinancialProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsComponent]
    });
    fixture = TestBed.createComponent(FinancialProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
