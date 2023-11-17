import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class PreloadScreenService {

  private preloadScreenSubject = new Subject<boolean>();
  preloadScreenSubject$ = this.preloadScreenSubject.asObservable();

  // función para mostrar la pantalla de carga
  show() {
    this.preloadScreenSubject.next(true);
  }

  // función para ocultar la pantalla de carga
  hide() {
    this.preloadScreenSubject.next(false);
  }

}
