import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipmentUpdateComponent } from './admin-shipment-update.component';

describe('AdminShipmentUpdateComponent', () => {
  let component: AdminShipmentUpdateComponent;
  let fixture: ComponentFixture<AdminShipmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShipmentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShipmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
