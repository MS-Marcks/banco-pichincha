import { TestBed } from '@angular/core/testing';
import { FinancialProductsService } from '../../../src/app/core/services/financial-products.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../src/app/core/interceptors/principal.interceptor.service';
import { IFinancialProducts } from '../../../src/app/shared/interfaces/ifinancial-products';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }],
    });
    service = TestBed.inject(FinancialProductsService);
  });

  test('Validar: Se crea el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  test('Validar: Aceptado por traer datos de los productos', async () => {
    const dataSource: IFinancialProducts[] = await service.Get();
    expect(dataSource.length).toBeGreaterThanOrEqual(0);
  });
});

