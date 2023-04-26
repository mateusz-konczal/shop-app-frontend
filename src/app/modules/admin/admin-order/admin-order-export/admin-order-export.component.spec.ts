import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderExportComponent } from './admin-order-export.component';

describe('AdminOrderExportComponent', () => {
  let component: AdminOrderExportComponent;
  let fixture: ComponentFixture<AdminOrderExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
