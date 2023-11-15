import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEndpointService<T> {

  constructor(@Inject(String) protected _urlBase: string, protected _http: HttpClient) { }

  Get(): Observable<T> {
    return this._http.get<T>(this._urlBase).pipe(catchError(this.handleError));
  }

  Filter(item: string): Observable<T> {
    return this._http.get<T>(`${this._urlBase}${item}`).pipe(catchError(this.handleError));
  }

  Create(item: T): Observable<T> {
    return this._http.post<T>(this._urlBase, item).pipe(catchError(this.handleError));
  }

  Update(item: T): Observable<T> {
    return this._http.put<T>(this._urlBase, item).pipe(catchError(this.handleError));
  }

  Patch(item: T): Observable<T> {
    return this._http.patch<T>(this._urlBase, item).pipe(catchError(this.handleError));
  }
  Delete(item: string): Observable<T> {
    return this._http.delete<T>(`${this._urlBase}${item}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    // Manejar errores aquí, puedes loguearlos, mostrar mensajes, etc.
    console.error('Error en la solicitud:', error);
    return error.message || 'Error en la solicitud';
  }
}
