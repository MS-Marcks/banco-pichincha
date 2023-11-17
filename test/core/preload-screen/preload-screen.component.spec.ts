import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadScreenComponent } from '../../../src/app/core/preload-screen/preload-screen.component';
import { PreloadScreenService } from '../../../src/app/core/preload-screen/preload-screen.service';

describe('PreloadScreenComponent', () => {
  let component: PreloadScreenComponent;
  let fixture: ComponentFixture<PreloadScreenComponent>;
  let compiled: HTMLElement;
  let service: PreloadScreenService
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreloadScreenComponent],
      providers: [PreloadScreenService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadScreenComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PreloadScreenService);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que no debe mostrar el spinner de carga', () => {
    const divSpinner = compiled.querySelector("[class=spinner]");
    expect(divSpinner).toBeNull();
  });

  test('Validar: Aceptado que debe mostrar el spinner de carga', () => {
    component.loading = true;
    fixture.detectChanges()
    const divSpinner = compiled.querySelector("[class=spinner]");
    expect(divSpinner).not.toBeNull();
  });

  test('Validar: Aceptado que debe mostrar el spinner de carga mediante el servicio', () => {
    service.show();
    fixture.detectChanges()
    const divSpinner = compiled.querySelector("[class=spinner]");
    expect(divSpinner).not.toBeNull();
  });
  test('Validar: Aceptado que debe ocultar el spinner de carga mediante el servicio', () => {
    service.show();
    fixture.detectChanges()
    const divSpinner = compiled.querySelector("[class=spinner]");
    expect(divSpinner).not.toBeNull();
    service.hide();
    fixture.detectChanges();
    const divSpinnerPost = compiled.querySelector("[class=spinner]");
    expect(divSpinnerPost).toBeNull();
  });
});
