import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { IToast } from '../../interfaces/itoast';
import { EToast } from 'app/configs/etoast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<IToast>();
  toastState$ = this.toastSubject.asObservable();

  showToast(type: EToast, message: string) {
    this.toastSubject.next({ type, message });
  }

}
