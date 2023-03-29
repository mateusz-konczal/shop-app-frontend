import { TestBed } from '@angular/core/testing';

import { AdminMessageService } from './admin-message.service';

describe('AdminMessageService', () => {
  let service: AdminMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
