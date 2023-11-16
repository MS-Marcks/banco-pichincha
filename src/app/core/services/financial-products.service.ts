import { Injectable } from '@angular/core';
import { BaseEndpointService } from '../abstract/base-endpoint.service';
import { IFinancialProducts } from '../../shared/interfaces/ifinancial-products';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService extends BaseEndpointService<IFinancialProducts> {

  constructor(private http: HttpClient) {
    super(`${environment.URLBASE}products`, http);
  }

  async verificationProductById(id: string): Promise<boolean> {
    return lastValueFrom(this._http.get<boolean>(`${environment.URLBASE}products/verification?id=${id}`).pipe());
  }
}
