import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { IToast } from '../../interfaces/itoast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<IToast>();
  toastState$ = this.toastSubject.asObservable();

  showToast(toast:IToast) {
    this.toastSubject.next(toast);
  }

}
