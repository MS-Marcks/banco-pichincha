import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from '../../../../src/app/shared/components/tooltip/tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let compiled: HTMLElement
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });
  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que cambie el valor de isTooltipVisible de false a true cuando se haga el evento mouseenter y se muestre el texto enviado por Input', () => {
    expect(component.isTooltipVisible).toBe(false);
    component.message = "tooltip";
    const span = compiled.querySelector("span");
    span?.dispatchEvent(new Event("mouseenter"));
    fixture.detectChanges();
    const div = compiled.querySelector("[class=tooltip-content]");
    expect(component.isTooltipVisible).toBe(true);
    expect(div?.textContent).toContain("tooltip");
  });

  test('Validar: Aceptado que cambie el valor de isTooltipVisible de true a false cuando se haga el evento mouseleave y que no se muestre el texto enviado por Input', () => {
    expect(component.isTooltipVisible).toBe(false);
    component.message = "tooltip";
    const span = compiled.querySelector("span");
    span?.dispatchEvent(new Event("mouseenter"));
    fixture.detectChanges();
    const div = compiled.querySelector("[class=tooltip-content]");
    expect(component.isTooltipVisible).toBe(true);
    expect(div?.textContent).toContain("tooltip");

    span?.dispatchEvent(new Event("mouseleave"));
    fixture.detectChanges();
    const divAfter = compiled.querySelector("[class=tooltip-content]");
    expect(component.isTooltipVisible).toBe(false);
    expect(divAfter).toBeNull();
  });
});
