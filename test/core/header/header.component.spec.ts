import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../../../src/app/core/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

  });

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que muestre el texto BANCO y PICHINCHA', () => {
    const h1 = compiled.querySelectorAll("h1");
    expect(h1[0]?.textContent).toContain("BANCO");
    expect(h1[1]?.textContent).toContain("PICHINCHA");
  });

  test('Validar: Aceptado que muestre que este mostrando el alt y la ruta de la ruta principal', () => {
    const img = compiled.querySelector("img");
    expect(img?.src).toContain("assets/img/logo.png");
    expect(img?.alt).toContain("Logo Banco Pichincha");
  });
});

