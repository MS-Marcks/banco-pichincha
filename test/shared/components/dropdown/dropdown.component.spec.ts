import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from '../../../../src/app/shared/components/dropdown/dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que cambie el valor de false a true y viceversa', () => {
    const div = compiled.querySelector("div");
    div?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.showDropdown).toBe(true);
    div?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.showDropdown).toBe(false);
  });

  test('Validar: Aceptado que cambie el valor de true a false al activar la función closeDropdown', () => {
    const div = compiled.querySelector("div");
    div?.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(component.showDropdown).toBe(true);
    component.closeDropdown();
    fixture.detectChanges();
    expect(component.showDropdown).toBe(false);
  });

});
