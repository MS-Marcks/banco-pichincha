import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from '../../../../src/app/shared/components/toast/toast.component';
import { ToastService } from '../../../../src/app/shared/components/toast/toast.service';
import { EToast } from '../../../../src/app/configs/etoast';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let compiled: HTMLElement;
  let service: ToastService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [ToastService]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que se muestre con los valores de SUCCESS y que muestre el mensaje', () => {
    service.showToast(EToast.SUCCESS, "mensaje");
    component.show();
    fixture.detectChanges();
    const toast = compiled.querySelector("[class='toast toast-success toast-show']");
    expect(toast).not.toBeNull();
    expect(toast?.textContent).toContain("mensaje");
  });
  test('Validar: Aceptado que se muestre con los valores de WARNING y que muestre el mensaje', () => {
    service.showToast(EToast.WARNING, "mensaje");
    component.show();
    fixture.detectChanges();
    const toast = compiled.querySelector("[class='toast toast-warning toast-show']");
    expect(toast).not.toBeNull();
    expect(toast?.textContent).toContain("mensaje");
  });
  test('Validar: Aceptado que se muestre con los valores de DANGER y que muestre el mensaje', () => {
    service.showToast(EToast.DANGER, "mensaje");
    component.show();
    fixture.detectChanges();
    const toast = compiled.querySelector("[class='toast toast-danger toast-show']");
    expect(toast).not.toBeNull();
    expect(toast?.textContent).toContain("mensaje");
  });
});

