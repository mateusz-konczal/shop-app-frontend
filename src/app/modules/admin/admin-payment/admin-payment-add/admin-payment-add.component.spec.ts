import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentAddComponent } from './admin-payment-add.component';

describe('AdminPaymentAddComponent', () => {
  let component: AdminPaymentAddComponent;
  let fixture: ComponentFixture<AdminPaymentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
