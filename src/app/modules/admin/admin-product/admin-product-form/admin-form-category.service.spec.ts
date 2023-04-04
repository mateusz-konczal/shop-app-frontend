import { TestBed } from '@angular/core/testing';

import { AdminFormCategoryService } from './admin-form-category.service';

describe('AdminFormCategoryService', () => {
  let service: AdminFormCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
