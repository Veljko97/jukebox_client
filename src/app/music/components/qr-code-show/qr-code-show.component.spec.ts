import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeShowComponent } from './qr-code-show.component';

describe('QrCodeShowComponent', () => {
  let component: QrCodeShowComponent;
  let fixture: ComponentFixture<QrCodeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
