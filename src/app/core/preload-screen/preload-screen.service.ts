import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class PreloadScreenService {

  private preloadScreenSubject = new Subject<boolean>();
  preloadScreenSubject$ = this.preloadScreenSubject.asObservable();

  show() {
    this.preloadScreenSubject.next(true);
  }

  hide() {
    this.preloadScreenSubject.next(false);
  }

}
