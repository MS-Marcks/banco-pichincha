import { Injectable } from '@angular/core';
import { BaseEndpointService } from '../abstract/base-endpoint.service';
import { IFinancialProducts } from 'src/app/shared/interfaces/ifinancial-products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService extends BaseEndpointService<IFinancialProducts> {

  constructor(private http: HttpClient) {
    super(`${environment.URLBASE}products/`, http);
  }

}
