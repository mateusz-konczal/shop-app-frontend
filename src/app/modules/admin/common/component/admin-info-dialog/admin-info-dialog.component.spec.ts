import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoDialogComponent } from './admin-info-dialog.component';

describe('AdminInfoDialogComponent', () => {
  let component: AdminInfoDialogComponent;
  let fixture: ComponentFixture<AdminInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
