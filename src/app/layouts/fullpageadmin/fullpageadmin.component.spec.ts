import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpageadminComponent } from './fullpageadmin.component';

describe('FullpageadminComponent', () => {
  let component: FullpageadminComponent;
  let fixture: ComponentFixture<FullpageadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullpageadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullpageadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
