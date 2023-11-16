import { Component, OnDestroy } from '@angular/core';
import { PreloadScreenService } from './preload-screen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'core-preload-screen',
  templateUrl: './preload-screen.component.html',
  styleUrls: ['./preload-screen.component.css']
})
export class PreloadScreenComponent  implements OnDestroy {

  loading = false;
  private preloadScreenSubscription: Subscription;
  constructor(private preloadScreenService: PreloadScreenService) {
    this.preloadScreenSubscription = this.preloadScreenService.preloadScreenSubject$.subscribe((state: boolean) => {
      this.loading = state;
    });
  }

  ngOnDestroy() {
    this.preloadScreenSubscription.unsubscribe();
  }

}
