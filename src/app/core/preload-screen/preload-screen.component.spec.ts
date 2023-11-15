import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadScreenComponent } from './preload-screen.component';

describe('PreloadScreenComponent', () => {
  let component: PreloadScreenComponent;
  let fixture: ComponentFixture<PreloadScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreloadScreenComponent]
    });
    fixture = TestBed.createComponent(PreloadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
