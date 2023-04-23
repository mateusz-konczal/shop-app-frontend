import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentUpdateComponent } from './admin-payment-update.component';

describe('AdminPaymentUpdateComponent', () => {
  let component: AdminPaymentUpdateComponent;
  let fixture: ComponentFixture<AdminPaymentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaymentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
