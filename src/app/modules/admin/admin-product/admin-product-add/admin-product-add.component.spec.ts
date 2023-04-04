import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAddComponent } from './admin-product-add.component';

describe('AdminProductAddComponent', () => {
  let component: AdminProductAddComponent;
  let fixture: ComponentFixture<AdminProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
