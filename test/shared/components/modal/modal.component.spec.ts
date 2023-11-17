import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from '../../../../src/app/shared/components/modal/modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });
  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que se muestre el title que le envia por Input', () => {
    component.title = "Titulo";
    fixture.detectChanges();
    const h2 = compiled.querySelector("h2");
    expect(h2?.textContent).toContain(component.title);
  });

  test('Validar: Aceptado que emita un evento al presionar el boton para cerrar el Modal', () => {
    jest.spyOn(component.close, "emit");
    const close = compiled.querySelector("[data-test=close-modal]");
    close?.dispatchEvent(new Event("click"));
    expect(component.close.emit).toHaveBeenCalledWith(true);
  });
});
