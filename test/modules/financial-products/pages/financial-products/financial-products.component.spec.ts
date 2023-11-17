import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { FinancialProductsComponent } from '../../../../../src/app/modules/financial-products/pages/financial-products/financial-products.component';
import { PrincipalInterceptorService } from '../../../../../src/app/core/interceptors/principal.interceptor.service';
import { SharedModule } from '../../../../../src/app/shared/shared.module';
import { FinancialProductsService } from '../../../../../src/app/core/services/financial-products.service';
import { TableComponent } from '../../../../../src/app/modules/financial-products/components/table/table.component';
import { environment } from '../../../../../src/environments/environment';
import { SearchBarComponent } from '../../../../../src/app/shared/components/search-bar/search-bar.component';

const DATA = [
  {
    id: "tjr-card999",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card998",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card997",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card999",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card998",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }, {
    id: "tjr-card997",
    name: "12345",
    description: "Mastercard y Visa",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: new Date(),
    date_revision: new Date()
  }
]

describe('FinancialProductsComponent', () => {
  let component: FinancialProductsComponent;
  let fixture: ComponentFixture<FinancialProductsComponent>;
  let compiled: any;
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductsComponent, TableComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, FinancialProductsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProductsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  test('Validar: Se crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  test('Validar: Aceptado que se muestra el apartado de Cargando....', () => {
    const strong = compiled.querySelector("#state-loading");
    expect(strong?.textContent).toContain("Cargando...");
  });

  test('Validar: Aceptado que se esta haciendo una peticion GET para obtener los productos ', () => {
    const request = httpMock.expectOne(environment.URLBASE + "products");
    expect(request.request.method).toBe("GET");
  });

  test('Validar: Aceptado que debe de realizar la busqueda por el search bar y no debe de mostrar nada', () => {
    const searchBarDebugElement = fixture.debugElement.query(By.directive(SearchBarComponent));
    const searchBarCompomentIn: SearchBarComponent = searchBarDebugElement.componentInstance;
    component.dataSourceShadow = DATA;
    searchBarCompomentIn.search.emit("123456789");
    fixture.detectChanges();
    expect(component.dataSource?.length).toBe(0);
  });
});
