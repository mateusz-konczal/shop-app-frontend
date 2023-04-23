import { TestBed } from '@angular/core/testing';

import { AdminShipmentService } from './admin-shipment.service';

describe('AdminShipmentService', () => {
  let service: AdminShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
