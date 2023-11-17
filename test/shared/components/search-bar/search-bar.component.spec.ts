import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from '../../../../src/app/shared/components/search-bar/search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que emita el evento para buscar en la tabla', () => {
    jest.spyOn(component.search, "emit");
    const input = compiled.querySelector("[data-test=search-bar]") as HTMLInputElement;
    input.value = "123456789";
    input.dispatchEvent(new Event("keyup"));
    expect(component.search.emit).toHaveBeenCalledWith("123456789");
  });
});
