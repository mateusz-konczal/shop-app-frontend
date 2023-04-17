import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipmentComponent } from './admin-shipment.component';

describe('AdminShipmentComponent', () => {
  let component: AdminShipmentComponent;
  let fixture: ComponentFixture<AdminShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
