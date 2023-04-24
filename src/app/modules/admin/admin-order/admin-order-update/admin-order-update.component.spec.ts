import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderUpdateComponent } from './admin-order-update.component';

describe('AdminOrderUpdateComponent', () => {
  let component: AdminOrderUpdateComponent;
  let fixture: ComponentFixture<AdminOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
