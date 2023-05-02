import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderStatsComponent } from './admin-order-stats.component';

describe('AdminOrderStatsComponent', () => {
  let component: AdminOrderStatsComponent;
  let fixture: ComponentFixture<AdminOrderStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
