import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { EToast } from '../../../configs/etoast';
import { IToast } from '../../interfaces/itoast';

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {


  toastConf!: IToast;
  private toastSubscription: Subscription;

  constructor(private toastService: ToastService, private renderer: Renderer2, private el: ElementRef) {
    this.toastSubscription = this.toastService.toastState$.subscribe((toast: IToast) => {
      this.toastConf = toast;
      this.show();
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

  show() {
    const toastElement: HTMLDivElement = this.el.nativeElement.querySelector('.toast');
    if (!toastElement) return;

    if (this.toastConf.type === EToast.SUCCESS) {
      this.renderer.addClass(toastElement, 'toast-success');
    } else if (this.toastConf.type === EToast.WARNING) {
      this.renderer.addClass(toastElement, 'toast-warning');
    } else if (this.toastConf.type === EToast.DANGER) {
      this.renderer.addClass(toastElement, 'toast-danger');
    }

    this.renderer.addClass(toastElement, 'toast-show');
    this.renderer.removeClass(toastElement, 'toast-hide');
    this.renderer.removeClass(toastElement, 'fade-in-out');


    setTimeout(() => {
      this.renderer.removeClass(toastElement, 'toast-show');
      this.renderer.addClass(toastElement, 'toast-hide');
      if (this.toastConf.type === EToast.SUCCESS) {
        this.renderer.removeClass(toastElement, 'toast-success');
      } else if (this.toastConf.type === EToast.WARNING) {
        this.renderer.removeClass(toastElement, 'toast-warning');
      } else if (this.toastConf.type === EToast.DANGER) {
        this.renderer.removeClass(toastElement, 'toast-danger');
      }
    }, 3000);
  }
}
