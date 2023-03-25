import { TestBed } from '@angular/core/testing';

import { AdminProductAddService } from './admin-product-add.service';

describe('AdminProductAddService', () => {
  let service: AdminProductAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
