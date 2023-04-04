import { TestBed } from '@angular/core/testing';

import { AdminProductUpdateService } from './admin-product-update.service';

describe('AdminProductUpdateService', () => {
  let service: AdminProductUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
