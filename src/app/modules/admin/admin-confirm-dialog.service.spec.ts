import { TestBed } from '@angular/core/testing';

import { AdminConfirmDialogService } from './admin-confirm-dialog.service';

describe('AdminConfirmDialogService', () => {
  let service: AdminConfirmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminConfirmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
