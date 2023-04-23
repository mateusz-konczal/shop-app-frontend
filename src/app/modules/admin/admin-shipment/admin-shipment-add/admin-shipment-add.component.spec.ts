import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipmentAddComponent } from './admin-shipment-add.component';

describe('AdminShipmentAddComponent', () => {
  let component: AdminShipmentAddComponent;
  let fixture: ComponentFixture<AdminShipmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShipmentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShipmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
